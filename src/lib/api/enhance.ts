export async function enhanceSummary(currentSummary: string, jobTitle: string, fullName: string): Promise<string> {
  const response = await fetch('/api/ai/enhance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentSummary, jobTitle, fullName, type: 'summary' }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Erreur lors de l\'amélioration du résumé');
  }

  return result.enhanced;
}

export async function enhanceExperience(currentDescription: string, position: string, company: string): Promise<string> {
  const response = await fetch('/api/ai/enhance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentSummary: currentDescription, jobTitle: position, company, type: 'experience' }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Erreur lors de l\'amélioration de la description');
  }

  return result.enhanced;
}
