// export const validateAndCleanPhone = (phone: string): string | null => {
//   if (!phone) return null;

//   // enlever espaces
//   let clean = phone.replace(/\s/g, '');

//   // cas Cameroun local : 6XXXXXXXX / 2XXXXXXXX / 3XXXXXXXX / 8XXXXXXXX
//   if (/^[2368]\d{8}$/.test(clean)) {
//     return '+237' + clean;
//   }

//   // déjà en format 237XXXXXXXXX
//   if (/^237[2368]\d{8}$/.test(clean)) {
//     return '+' + clean;
//   }

//   // format international déjà correct
//   if (/^\+237[2368]\d{8}$/.test(clean)) {
//     return clean;
//   }

//   // fallback international générique (+XX...)
//   if (/^\+\d{7,15}$/.test(clean)) {
//     return clean;
//   }

//   return null;
// };































export function validateAndCleanPhone(phone: string): string | null {
  const clean = phone.toString().replace(/\s/g, '');

  if (/^[2368]\d{8}$/.test(clean)) return '+237' + clean;
  if (/^237[2368]\d{8}$/.test(clean)) return '+' + clean;
  if (/^\+237[2368]\d{8}$/.test(clean)) return clean;
  if (/^\+\d{7,15}$/.test(clean)) return clean;

  return null;
}