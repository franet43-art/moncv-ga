export async function parseCV(rawText: string): Promise<any> {
  const response = await fetch('/api/ai/parse-cv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rawText }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Erreur lors de l\'analyse du CV');
  }

  return result.data;
}
