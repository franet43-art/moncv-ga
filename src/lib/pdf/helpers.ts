export function formatDate(dateString: string | undefined, isCurrent?: boolean): string {
  if (isCurrent) return 'Présent';
  if (!dateString) return '';

  try {
    // Expected format: YYYY-MM
    const [year, month] = dateString.split('-');
    if (year && month) {
      return `${month}/${year}`;
    }
    return dateString;
  } catch (e) {
    return dateString;
  }
}

export function truncate(text: string | undefined, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
