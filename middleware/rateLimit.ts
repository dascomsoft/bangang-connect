import { NextRequest, NextResponse } from 'next/server';

interface RateLimitInfo {
  count: number;
  firstRequest: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

// Nettoyer périodiquement la map (toutes les heures)
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.firstRequest > windowMs) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 60 * 1000); // Nettoyage toutes les heures

function getClientIp(request: NextRequest): string {
  // Liste des headers possibles pour l'IP du client
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // En développement, utiliser une IP par défaut
  if (process.env.NODE_ENV === 'development') {
    return '127.0.0.1';
  }
  
  return 'unknown';
}

export function rateLimit(
  request: NextRequest, 
  maxRequests: number = 100, 
  windowMs: number = 15 * 60 * 1000
) {
  const ip = getClientIp(request);
  const now = Date.now();
  
  const userRate = rateLimitMap.get(ip);
  
  if (!userRate) {
    rateLimitMap.set(ip, {
      count: 1,
      firstRequest: now
    });
    return null;
  }
  
  // Réinitialiser si la fenêtre est expirée
  if (now - userRate.firstRequest > windowMs) {
    rateLimitMap.set(ip, {
      count: 1,
      firstRequest: now
    });
    return null;
  }
  
  // Vérifier la limite
  if (userRate.count >= maxRequests) {
    const retryAfter = Math.ceil((userRate.firstRequest + windowMs - now) / 1000);
    
    return NextResponse.json(
      { 
        error: 'Trop de requêtes',
        message: `Veuillez réessayer dans ${retryAfter} secondes`,
        retryAfter 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString()
        }
      }
    );
  }
  
  // Incrémenter le compteur
  userRate.count++;
  rateLimitMap.set(ip, userRate);
  
  return null;
}

// Version avec options personnalisables
export function createRateLimit(options?: {
  maxRequests?: number;
  windowMs?: number;
}) {
  const maxRequests = options?.maxRequests || 100;
  const windowMs = options?.windowMs || 15 * 60 * 1000;
  
  return (request: NextRequest) => {
    return rateLimit(request, maxRequests, windowMs);
  };
}

// Exemples de rate limiters préconfigurés
export const strictRateLimit = createRateLimit({ maxRequests: 10, windowMs: 60 * 1000 }); // 10 req/minute
export const mediumRateLimit = createRateLimit({ maxRequests: 50, windowMs: 60 * 1000 }); // 50 req/minute
export const relaxedRateLimit = createRateLimit({ maxRequests: 200, windowMs: 60 * 1000 }); // 200 req/minute

// Pour les routes sensibles (login, register)
export const authRateLimit = createRateLimit({ maxRequests: 5, windowMs: 60 * 1000 }); // 5 tentatives/minute

// Pour les routes API publiques
export const publicApiRateLimit = createRateLimit({ maxRequests: 30, windowMs: 60 * 1000 }); // 30 req/minute