"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { FileText, Plus, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserMenu() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button size="sm" asChild className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/editor/new?reset=true">Créer un CV</Link>
        </Button>
      </div>
    )
  }

  const userInitial = user.email ? user.email.charAt(0).toUpperCase() : "U"

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 p-0">
          <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Compte</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Mes CV</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/editor/new?reset=true" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>Nouveau CV</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
