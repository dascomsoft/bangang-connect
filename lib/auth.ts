// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { cookies } from 'next/headers';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// export interface JWTPayload {
//   userId: string;
//   role: string;
//   iat?: number;
//   exp?: number;
// }

// export async function hashPassword(password: string) {
//   return await bcrypt.hash(password, 10);
// }

// export async function comparePassword(password: string, hashedPassword: string) {
//   return await bcrypt.compare(password, hashedPassword);
// }

// export function generateToken(userId: string, role: string) {
//   return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
// }

// export function verifyToken(token: string): JWTPayload | null {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// }

// // Pour Next.js 15 - les cookies sont asynchrones
// export async function setAuthCookie(token: string) {
//   const cookieStore = await cookies();
//   cookieStore.set('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 7 * 24 * 60 * 60,
//     path: '/'
//   });
// }

// export async function removeAuthCookie() {
//   const cookieStore = await cookies();
//   cookieStore.delete('token');
// }

// export async function getAuthToken() {
//   const cookieStore = await cookies();
//   return cookieStore.get('token')?.value;
// }

// export async function getCurrentUser() {
//   const token = await getAuthToken();
//   if (!token) return null;
  
//   const decoded = verifyToken(token);
//   if (!decoded) return null;
  
//   return decoded;
// }
































import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Interface pour le payload JWT
export interface JWTPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

// ============================================
// FONCTIONS DE HASHAGE
// ============================================

/**
 * Hache un mot de passe avec bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Compare un mot de passe avec son hash
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// ============================================
// FONCTIONS JWT
// ============================================

/**
 * Génère un token JWT pour un utilisateur
 */
export function generateToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Vérifie et décode un token JWT
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// ============================================
// FONCTIONS COOKIES (Next.js App Router)
// ============================================

/**
 * Récupère le token depuis les cookies
 */
export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}

/**
 * Définit le cookie d'authentification
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 jours
    path: '/'
  });
}

/**
 * Supprime le cookie d'authentification
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Récupère l'utilisateur courant à partir du token
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  return decoded;
}

/**
 * Vérifie si un token est valide et non expiré
 */
export function isTokenValid(token: string): boolean {
  const decoded = verifyToken(token);
  if (!decoded) return false;
  
  // Vérifier si le token n'est pas expiré
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    return false;
  }
  
  return true;
}

/**
 * Rafraîchit le token (crée un nouveau token)
 */
export function refreshToken(oldToken: string): string | null {
  const decoded = verifyToken(oldToken);
  if (!decoded) return null;
  
  // Générer un nouveau token
  return generateToken(decoded.userId, decoded.role);
}

// ============================================
// MIDDLEWARE HELPERS
// ============================================

/**
 * Extrait le token de l'en-tête Authorization
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Extrait le token des cookies (pour Server Components)
 */
export async function extractTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

