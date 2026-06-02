import type { ComponentType } from "react";

// ── Manifesto journey pillar ──────────────────────────────────────────────────
export interface JourneyPillar {
  id:       string;
  eyebrow:  string;
  tag:      string;
  headline: string[];
  body:     string;
  quote:    string;
  accent:   string;
}

// ── Culture pillar card ───────────────────────────────────────────────────────
export interface CulturePillarData {
  id:        string;
  icon:      ComponentType<{ className?: string; strokeWidth?: number }>;
  title:     string;
  desc:      string;
  color:     string;
  iconHover: { scale?: number; y?: number; rotate?: number };
  floatY:    [number, number];
  floatDur:  number;
  gridClass: string;
}
