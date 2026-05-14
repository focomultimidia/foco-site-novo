"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;      // 0 = background · 1 = foreground
  radius: number;
  opacity: number;
  glowRadius: number;
  isGlowing: boolean;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  t: number;
  speed: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const DIST_DESKTOP         = 200;
const DIST_MOBILE          = 145;
const BURST_SIZE           = 5;      // pulses spawned per burst
const BURST_INTERVAL_MS    = 1300;   // ms between bursts
const PARALLAX_PX          = 22;     // max foreground parallax shift (px)

// ─── Component ────────────────────────────────────────────────────────────────

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ nx: 0, ny: 0 }); // normalised -1 → 1

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];

    // ── Helpers ──────────────────────────────────────────────────────────────

    const mobile    = () => window.innerWidth < 768;
    const nodeCount = () => (mobile() ? 42 : 90);
    const maxDist   = () => (mobile() ? DIST_MOBILE : DIST_DESKTOP);

    function makeNode(w: number, h: number): Node {
      const depth  = Math.random();
      const front  = depth > 0.62;
      const mid    = depth >= 0.28 && depth <= 0.62;
      // foreground nodes are 3× faster than background
      const speed  = 0.45 + depth * 1.85;
      const angle  = Math.random() * Math.PI * 2;

      return {
        x:          Math.random() * w,
        y:          Math.random() * h,
        vx:         Math.cos(angle) * speed,
        vy:         Math.sin(angle) * speed,
        depth,
        radius:     front ? 2.6 + Math.random() * 1.8
                          : mid  ? 1.4 + Math.random() * 1.0
                                 : 0.7 + Math.random() * 0.6,
        opacity:    front ? 0.58 + Math.random() * 0.18
                          : mid  ? 0.28 + Math.random() * 0.14
                                 : 0.10 + Math.random() * 0.10,
        glowRadius: front ? 24 + Math.random() * 22
                          : mid  ? 10 + Math.random() * 10
                                 : 0,
        isGlowing:  front ? Math.random() < 0.58
                          : mid  ? Math.random() < 0.22
                                 : false,
      };
    }

    function initNodes(w: number, h: number) {
      nodes = Array.from({ length: nodeCount() }, () => makeNode(w, h));
    }

    function resize() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width  = w;
      canvas.height = h;
      initNodes(w, h);
    }

    // ── Burst spawner ─────────────────────────────────────────────────────────

    function spawnBurst() {
      const d2 = maxDist() * maxDist();
      let spawned = 0;
      let tries   = 0;
      while (spawned < BURST_SIZE && tries < 180) {
        tries++;
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < d2) {
          pulses.push({
            fromIdx: i,
            toIdx:   j,
            t:       0,
            // fast: completes in ~40–70 frames (~0.65–1.1 s at 60fps)
            speed:   0.014 + Math.random() * 0.017,
          });
          spawned++;
        }
      }
    }

    // ── Mouse tracking ────────────────────────────────────────────────────────

    function onMouseMove(e: MouseEvent) {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        nx: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width)  * 2 - 1)),
        ny: Math.max(-1, Math.min(1, ((e.clientY - r.top)  / r.height) * 2 - 1)),
      };
    }
    function onMouseLeave() { mouseRef.current = { nx: 0, ny: 0 }; }

    window.addEventListener("mousemove",   onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ── Draw loop ─────────────────────────────────────────────────────────────

    function draw() {
      const { width: W, height: H } = canvas;
      const { nx, ny } = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      const d  = maxDist();
      const d2 = d * d;

      // Physics step
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0)  { n.x = 0;  n.vx =  Math.abs(n.vx); }
        if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx); }
        if (n.y < 0)  { n.y = 0;  n.vy =  Math.abs(n.vy); }
        if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy); }
      }

      // Precompute parallax-shifted draw positions once per frame
      const px = new Float32Array(nodes.length);
      const py = new Float32Array(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        px[i] = nodes[i].x + nx * nodes[i].depth * PARALLAX_PX;
        py[i] = nodes[i].y + ny * nodes[i].depth * PARALLAX_PX;
      }

      // ── Connections ──────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = px[i] - px[j];
          const dy   = py[i] - py[j];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= d) continue;

          const proximity = 1 - dist / d;
          const avgDepth  = (nodes[i].depth + nodes[j].depth) * 0.5;
          // bg pairs: ~0.10–0.18 · fg pairs: ~0.32–0.50
          const alpha     = proximity * (0.10 + avgDepth * 0.40);
          // bg: 0.4px · fg: 1.3px
          const lw        = 0.4 + avgDepth * 0.9;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.lineWidth   = lw;
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      // ── Pulse bursts (additive blend → laser flares on light bg) ─────────────
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        if (pulse.t >= 1) { pulses.splice(p, 1); continue; }

        const fi = pulse.fromIdx;
        const ti = pulse.toIdx;

        // Abandon if source nodes drifted beyond connection range
        const cdx = nodes[fi].x - nodes[ti].x;
        const cdy = nodes[fi].y - nodes[ti].y;
        if (cdx * cdx + cdy * cdy > d2 * 1.25) { pulses.splice(p, 1); continue; }

        const x = px[fi] + (px[ti] - px[fi]) * pulse.t;
        const y = py[fi] + (py[ti] - py[fi]) * pulse.t;

        // Bell-curve: peaks at midpoint
        const s = Math.sin(pulse.t * Math.PI);
        const r = s * 9 + 2.5;
        const a = s * 0.58;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
        g.addColorStop(0,    `rgba(255,255,255,${a.toFixed(3)})`);
        g.addColorStop(0.30, `rgba(215,238,255,${(a * 0.42).toFixed(3)})`);
        g.addColorStop(1,    "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // ── Nodes (glow halo + core dot) ─────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = px[i];
        const y = py[i];

        if (n.isGlowing && n.glowRadius > 0) {
          // Stronger halos for foreground LEDs
          const peakA = 0.07 + n.depth * 0.30;
          const g = ctx.createRadialGradient(x, y, 0, x, y, n.glowRadius);
          g.addColorStop(0,    `rgba(255,255,255,${peakA.toFixed(3)})`);
          g.addColorStop(0.45, `rgba(235,248,255,${(peakA * 0.42).toFixed(3)})`);
          g.addColorStop(1,    "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.fillStyle = g;
          ctx.arc(x, y, n.glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${n.opacity.toFixed(3)})`;
        ctx.arc(x, y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    // ── Kick-off ──────────────────────────────────────────────────────────────

    const burstTimer = setInterval(spawnBurst, BURST_INTERVAL_MS);

    resize();
    draw();
    setTimeout(spawnBurst, 250); // first burst immediately

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(burstTimer);
      ro.disconnect();
      window.removeEventListener("mousemove",   onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

export { NetworkBackground };
