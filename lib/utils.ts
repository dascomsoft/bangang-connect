export const BAD_WORDS = ['badword1', 'badword2', 'spam', 'hate']; // Add your bad words list

export function filterBadWords(text: string): { filtered: string; hasBadWords: boolean } {
  let filteredText = text;
  let hasBadWords = false;
  
  BAD_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi');
    if (regex.test(text)) {
      hasBadWords = true;
      filteredText = filteredText.replace(regex, '***');
    }
  });
  
  return { filtered: filteredText, hasBadWords };
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  return phoneRegex.test(phone);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}