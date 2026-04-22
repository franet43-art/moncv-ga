import { requireNoAuth } from '@/lib/supabase/guards'
import { LoginForm } from '@/components/auth/login-form'

export default async function LoginPage() {
  await requireNoAuth()

  return <LoginForm />
}
