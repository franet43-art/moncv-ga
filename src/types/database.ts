export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CVRecord {
  id: string
  user_id: string
  title: string
  content: Record<string, unknown>
  settings: Record<string, unknown>
  is_paid: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  cv_id: string | null
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  provider: string
  provider_ref: string | null
  phone_number: string | null
  created_at: string
  updated_at: string
}
