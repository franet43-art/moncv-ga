import { requireAuth } from "@/lib/supabase/guards"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { Header } from "@/components/layout/header"

export default async function DashboardPage() {
  await requireAuth()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <DashboardContent />
      </main>
    </div>
  )
}
