export function extractId(value: any): string | null {
  if (!value) return null;
  
  // String directe
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return /^[a-f\d]{24}$/i.test(trimmed) ? trimmed : null;
  }
  
  // ObjectId Mongoose ou objet avec _id
  const raw = value._id ?? value;
  
  // Utiliser toHexString() si disponible (ObjectId Mongoose natif)
  if (typeof raw?.toHexString === 'function') {
    const hex = raw.toHexString();
    return /^[a-f\d]{24}$/i.test(hex) ? hex : null;
  }
  
  // Sinon toString() classique
  const str = raw?.toString()?.trim() || '';
  return /^[a-f\d]{24}$/i.test(str) ? str : null;
}



