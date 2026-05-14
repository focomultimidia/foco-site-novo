"use client";

import { GenericInfoSection } from "@/features/shared/components/generic-info-section";
import { INFO_SECTIONS } from "@/features/shared/content/info-sections";

function OQueESection() {
  return (
    <GenericInfoSection
      {...INFO_SECTIONS.channelManager}
      imageSide="right"
    />
  );
}

export { OQueESection };
