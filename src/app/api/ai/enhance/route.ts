import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { currentSummary, jobTitle, fullName } = await req.json();

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'GROQ_API_KEY non configurée.' },
        { status: 500 }
      );
    }

    const systemPrompt = `Tu es un expert en rédaction de CV. Ton objectif est d'améliorer ou de générer un résumé professionnel en français (profil/summary) pour un candidat.
Le résumé doit faire entre 2 et 4 phrases, avoir un ton très professionnel, percutant et mettre en valeur le profil.
Tu vas recevoir le résumé actuel du candidat, son poste cible et son nom complet.
Si le résumé actuel est vide, génère-en un à partir du poste cible.
Ne réponds QU'AVEC le texte du résumé amélioré, sans guillemets, sans markdown, et sans aucune autre phrase de contexte.`;

    const userMessage = `Nom complet : ${fullName || 'Non spécifié'}
Poste ciblé : ${jobTitle || 'Non spécifié'}
Résumé actuel : ${currentSummary || 'Vide'}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Groq API error:", response.status, errorData);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'appel à l\'API Groq.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const enhancedContent = data.choices?.[0]?.message?.content?.trim();

    if (!enhancedContent) {
      return NextResponse.json(
        { success: false, error: 'Réponse vide de l\'IA.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, enhanced: enhancedContent });
  } catch (error) {
    console.error("API error in enhance:", error);
    return NextResponse.json(
      { success: false, error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
}
