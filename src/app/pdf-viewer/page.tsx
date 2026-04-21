import type { CVContent, CVSettings } from '@/types/cv'
import { CVViewerContent } from '@/components/templates/CVViewerContent'

export const dynamic = 'force-dynamic'

interface PdfViewerPageProps {
  searchParams: { data?: string }
}

export default function PdfViewerPage({ searchParams }: PdfViewerPageProps) {
  let content: CVContent | null = null
  let settings: CVSettings | null = null
  let isPaid: boolean = false

  try {
    if (searchParams.data) {
      const decoded = JSON.parse(
        Buffer.from(searchParams.data, 'base64').toString('utf-8')
      )
      content = decoded.content
      settings = decoded.settings
      isPaid = decoded.isPaid || false
    }
  } catch (e) {
    return <div>Erreur de données</div>
  }

  if (!content || !settings) {
    return <div>Données manquantes</div>
  }

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
        <CVViewerContent content={content} settings={settings} isPaid={isPaid} />
      </body>
    </html>
  )
}
