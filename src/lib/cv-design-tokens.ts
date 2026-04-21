export type TemplateTokens = {
  // Typography (px for HTML, pt for PDF is handled by consumer)
  nameSize: number
  jobTitleSize: number
  sectionTitleSize: number
  bodySize: number
  
  // Spacings (px/pt)
  sectionGap: number
  entryGap: number
  mainPadding: number
  sidebarPadding: number
  
  // Layout
  sidebarWidth: string
  
  // Fixed Colors
  textPrimary: string
  textSecondary: string
  textMuted: string
  borderColor: string
}

export const getTokens = (fontSize: "small" | "medium" | "large" = "medium"): TemplateTokens => {
  const baseTokens: TemplateTokens = {
    nameSize: 24,
    jobTitleSize: 16,
    sectionTitleSize: 12,
    bodySize: 10,
    sectionGap: 24,
    entryGap: 16,
    mainPadding: 36,
    sidebarPadding: 24,
    sidebarWidth: "35%",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    borderColor: "#E5E7EB",
  }

  const scales = {
    small: 0.85,
    medium: 1,
    large: 1.15,
  }

  const scale = scales[fontSize]

  return {
    ...baseTokens,
    nameSize: Math.round(baseTokens.nameSize * scale),
    jobTitleSize: Math.round(baseTokens.jobTitleSize * scale),
    sectionTitleSize: Math.round(baseTokens.sectionTitleSize * scale),
    bodySize: Math.round(baseTokens.bodySize * scale),
    sectionGap: Math.round(baseTokens.sectionGap * scale),
    entryGap: Math.round(baseTokens.entryGap * scale),
  }
}
