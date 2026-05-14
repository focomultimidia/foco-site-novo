"use client";

import { GenericInfoSection } from "@/features/shared/components/generic-info-section";
import { INFO_SECTIONS } from "@/features/shared/content/info-sections";

function OQueESection() {
  return (
    <GenericInfoSection
      {...INFO_SECTIONS.motorReservas}
      imageSide="right"
    />
  );
}

export { OQueESection };
