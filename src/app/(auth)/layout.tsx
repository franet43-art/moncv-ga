import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="relative z-10 w-full max-w-md px-4 py-12">
        {children}
      </div>
    </div>
  )
}
