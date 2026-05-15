import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update session for protected routes
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/checkout/:path*',
    '/api/:path*',
  ],
}
