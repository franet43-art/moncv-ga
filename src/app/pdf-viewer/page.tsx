import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CVViewerContent } from '@/components/templates/CVViewerContent'

export const dynamic = 'force-dynamic'

export default async function PdfViewerPage({
  searchParams,
}: {
  searchParams: { jobId?: string }
}) {
  if (!searchParams.jobId) {
    return <div>Job ID manquant</div>
  }

  const supabase = await createServerSupabaseClient()
  const { data: job, error } = await supabase
    .from('pdf_jobs')
    .select('content, settings, is_paid')
    .eq('id', searchParams.jobId)
    .single()

  if (error || !job) {
    console.error('[PDF_VIEWER] Fetch error:', error)
    return <div>Données introuvables</div>
  }

  const { content, settings, is_paid } = job

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { 
            width: 794px; 
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.fonts.ready.then(() => { document.title = 'PDF_READY'; });`
          }}
        />
      </head>
      <body>
        <CVViewerContent 
          content={content} 
          settings={settings} 
          isPaid={is_paid} 
        />
      </body>
    </html>
  )
}
