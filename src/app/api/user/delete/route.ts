import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour effectuer cette action" },
        { status: 401 }
      )
    }

    const adminClient = createAdminClient()

    // 1. Supprimer les CVs
    const { error: cvsError } = await adminClient
      .from("cvs")
      .delete()
      .eq("user_id", user.id)

    if (cvsError) {
      console.error("Error deleting CVs:", cvsError)
      return NextResponse.json({ error: "Erreur lors de la suppression des CVs" }, { status: 500 })
    }

    // 2. Anonymiser les paiements
    const { error: paymentsError } = await adminClient
      .from("payments")
      .update({ 
        user_id: null, 
        phone_number: null 
      })
      .eq("user_id", user.id)

    if (paymentsError) {
      // On log l'erreur mais on continue si ce n'est pas bloquant (certaines DB n'autorisent pas le NULL sur user_id)
      console.error("Error anonymizing payments:", paymentsError)
    }

    // 3. Supprimer le profil
    const { error: profileError } = await adminClient
      .from("profiles")
      .delete()
      .eq("id", user.id)

    if (profileError) {
      console.error("Error deleting profile:", profileError)
    }

    // 4. Supprimer le compte auth (Dernière étape)
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(user.id)

    if (deleteUserError) {
      console.error("Error deleting auth user:", deleteUserError)
      return NextResponse.json({ error: "Erreur lors de la suppression du compte Auth" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Critical error in delete user route:", err)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
