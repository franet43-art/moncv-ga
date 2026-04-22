import { createServiceSupabaseClient } from '@/lib/supabase/server'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { MinimalTemplate } from '@/components/templates/MinimalTemplate'
import { getTokens } from '@/lib/cv-design-tokens'

export const dynamic = 'force-dynamic'

export default async function PdfViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string }>
}) {
  const params = await searchParams

  if (!params.jobId) {
    return <div>Job ID manquant</div>
  }

  // Service role — pas de cookies nécessaires
  const supabase = createServiceSupabaseClient()
  
  const { data: job, error } = await supabase
    .from('pdf_jobs')
    .select('content, settings, is_paid')
    .eq('id', params.jobId)
    .single()

  if (error || !job) {
    console.error('[PDF_VIEWER] Fetch error:', error)
    return <div>Données introuvables — {error?.message}</div>
  }

  const { content, settings, is_paid } = job
  const tokens = getTokens(settings.fontSize as any)

  const fontMap: Record<string, string> = {
    inter: "Inter, sans-serif",
    merriweather: "Merriweather, serif",
    playfair: "'Playfair Display', serif",
    roboto: "Roboto, sans-serif",
  }

  return (
    <div
      id="cv-root"
      style={{
        fontFamily: fontMap[settings.fontFamily] || 'Inter, sans-serif',
        fontSize: `${tokens.bodySize}px`,
        backgroundColor: 'white',
        color: '#18181b',
        width: '794px',
        minHeight: '1123px',
        position: 'relative',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {!is_paid && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          pointerEvents: 'none', overflow: 'hidden',
          opacity: 0.07, userSelect: 'none',
        }}>
          <div style={{
            position: 'absolute', inset: '-50%',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', alignItems: 'center',
            transform: 'rotate(-35deg)',
          }}>
            {Array.from({ length: 100 }).map((_, i) => (
              <span key={i} style={{
                fontSize: '20px', fontWeight: 'bold',
                letterSpacing: '0.2em', whiteSpace: 'nowrap',
                padding: '48px',
              }}>MonCV.ga</span>
            ))}
          </div>
        </div>
      )}

      <div style={{
        width: '100%',
        padding: `${tokens.mainPadding}px`,
        position: 'relative', zIndex: 10,
      }}>
        {settings.templateId === 'classic' && (
          <ClassicTemplate content={content} settings={settings} tokens={tokens} />
        )}
        {settings.templateId === 'modern' && (
          <ModernTemplate content={content} settings={settings} tokens={tokens} />
        )}
        {settings.templateId === 'minimal' && (
          <MinimalTemplate content={content} settings={settings} tokens={tokens} />
        )}
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `document.fonts.ready.then(() => { document.title = 'PDF_READY'; });`
      }} />
    </div>
  )
}
