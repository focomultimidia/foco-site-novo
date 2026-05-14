"use client";

import { NetworkBackground } from "./network-background";

/**
 * Default background for all internal hero sections.
 * Inject via: <BaseInternalHero background={<InternalHeroBackground />} />
 *
 * Layers (all position: absolute, fill the parent):
 *   1. Base color  – #e7ecef solid
 *   2. Photo tint  – subtle texture overlay
 *   3. Orbs        – blurred ambient color blobs
 *   4. Dot grid    – radial-gradient pattern with vignette mask
 *   5. Network     – animated canvas (nodes + connections + data pulses)
 */
function InternalHeroBackground({
  imageSrc = "/assets/imgs/hero/bkg-modelos-sites3.png",
}: {
  imageSrc?: string;
} = {}) {
  return (
    <>
      {/* Base color */}
      <div className="absolute inset-0 bg-[#e7ecef]" />

      {/* Photo overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/3   left-[8%]  w-[500px] h-[500px] bg-blue-400/10  rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[4%] w-[380px] h-[380px] bg-[#244248]/8  rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[58%]  left-[42%] w-[280px] h-[280px] bg-indigo-300/8 rounded-full blur-2xl  pointer-events-none" />

      {/* Dot grid with radial vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:   "radial-gradient(circle, rgba(36,66,72,0.14) 1px, transparent 1px)",
          backgroundSize:    "36px 36px",
          maskImage:         "radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent)",
          WebkitMaskImage:   "radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent)",
          opacity: 0.45,
        }}
      />

      {/* Animated network effect */}
      <NetworkBackground />
    </>
  );
}

export { InternalHeroBackground };
