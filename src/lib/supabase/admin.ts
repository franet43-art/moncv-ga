import { createClient } from '@supabase/supabase-js'

// Notice: Using an implicit Database type mapping if available, or any.
// The user prompt indicated using type { Database } from '@/types/database',
// but database.ts only exports specific interfaces (CVRecord, etc.), not a global Database type.
// We'll omit the explicit `<Database>` generic to avoid TS build errors 
// while keeping full Supabase JS functionality.

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
