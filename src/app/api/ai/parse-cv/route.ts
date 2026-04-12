import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json(
        { success: false, error: 'rawText est requis et doit être une chaîne de caractères.' },
        { status: 400 }
      );
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'GROQ_API_KEY non configurée.' },
        { status: 500 }
      );
    }

    const systemPrompt = `
Tu es un analyseur de CV expert. Tu reçois le texte brut d'un CV et tu retournes UNIQUEMENT un objet JSON valide (pas de markdown, pas d'explication).

Structure JSON exacte :
{
  "personalInfo": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "address": "", "linkedin": "", "summary": "" },
  "experiences": [{ "id": "UUID", "company": "", "position": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "isCurrent": false, "description": "" }],
  "education": [{ "id": "UUID", "institution": "", "degree": "", "field": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "isCurrent": false }],
  "skills": [{ "id": "UUID", "name": "", "level": "debutant"|"intermediaire"|"avance"|"expert" }],
  "languages": [{ "id": "UUID", "name": "", "level": "basique"|"intermediaire"|"courant"|"bilingue"|"natif" }],
  "references": [{ "id": "UUID", "name": "", "position": "", "company": "", "email": "", "phone": "" }]
}

Règles : UUIDs générés, champs manquants = "", isCurrent: true si "Présent/Actuel/En cours", niveaux par défaut = "intermediaire". Réponds UNIQUEMENT avec le JSON.
`;

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
          { role: 'user', content: rawText }
        ],
        temperature: 0.1,
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
    let parsedContent = data.choices?.[0]?.message?.content?.trim();

    if (!parsedContent) {
      return NextResponse.json(
        { success: false, error: 'Réponse vide de l\'IA.' },
        { status: 500 }
      );
    }

    // Sometimes the model might wrap in markdown blocks despite instructions
    if (parsedContent.startsWith('```json')) {
      parsedContent = parsedContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (parsedContent.startsWith('```')) {
      parsedContent = parsedContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      const parsedCV = JSON.parse(parsedContent);
      return NextResponse.json({ success: true, data: parsedCV });
    } catch (parseError) {
      console.error("Failed to parse JSON from AI:", parsedContent);
      return NextResponse.json(
        { success: false, error: 'Le résultat n\'est pas un JSON valide.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error in parse-cv:", error);
    return NextResponse.json(
      { success: false, error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
}
