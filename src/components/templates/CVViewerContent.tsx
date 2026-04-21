"use client"

import type { CVContent, CVSettings } from "@/types/cv"
import { getTokens } from "@/lib/cv-design-tokens"
import { ClassicTemplate } from "./ClassicTemplate"
import { ModernTemplate } from "./ModernTemplate"
import { MinimalTemplate } from "./MinimalTemplate"

interface CVViewerContentProps {
  content: CVContent
  settings: CVSettings
  isPaid?: boolean
}

function WatermarkOverlay() {
  return (
    <div 
      className="absolute inset-0 z-50 pointer-events-none select-none overflow-hidden opacity-[0.07] dark:opacity-[0.05] print:hidden"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="absolute inset-[-50%] flex flex-wrap justify-center items-center content-center rotate-[-35deg]">
        {Array.from({ length: 100 }).map((_, i) => (
          <span 
            key={i} 
            className="text-xl font-bold tracking-[0.2em] whitespace-nowrap p-12"
          >
            MonCV.ga
          </span>
        ))}
      </div>
    </div>
  )
}

export function CVViewerContent({ content, settings, isPaid }: CVViewerContentProps) {
  const fontMap = {
    inter: "Inter, sans-serif",
    merriweather: "Merriweather, serif",
    playfair: "'Playfair Display', serif",
    roboto: "Roboto, sans-serif",
  }
  
  const tokens = getTokens(settings.fontSize as any)
  
  const wrapperStyle = {
    fontFamily: fontMap[settings.fontFamily as keyof typeof fontMap] || fontMap.inter,
    fontSize: `${tokens.bodySize}px`,
    "--accent": settings.accentColor,
    backgroundColor: 'white',
    color: '#18181b', // zinc-900
    width: '100%',
    minHeight: '297mm',
  } as React.CSSProperties

  return (
    <div 
      id="cv-preview"
      className="relative transition-all duration-300 group cv-preview-container" 
      style={wrapperStyle}
    >
      {/* Watermark Overlay */}
      {!isPaid && <WatermarkOverlay />}
      
      <div className="w-full max-w-full mx-auto relative z-10" style={{ padding: `${tokens.mainPadding}px` }}>
        {settings.templateId === "classic" && <ClassicTemplate content={content} settings={settings} tokens={tokens} />}
        {settings.templateId === "modern" && <ModernTemplate content={content} settings={settings} tokens={tokens} />}
        {settings.templateId === "minimal" && <MinimalTemplate content={content} settings={settings} tokens={tokens} />}
      </div>

      <style jsx global>{`
        @media print {
          .cv-preview-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
