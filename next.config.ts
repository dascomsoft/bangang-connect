import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // ✅ Correction: serverActions doit être un objet, pas un boolean
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // ✅ Ajouter cette option pour corriger l'avertissement des lockfiles
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;