import { requireNoAuth } from '@/lib/supabase/guards'
import { SignupForm } from '@/components/auth/signup-form'

export default async function SignupPage() {
  await requireNoAuth()

  return <SignupForm />
}
