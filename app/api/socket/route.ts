export const dynamic = "force-dynamic";
import { NextRequest } from 'next/server';

// Cette route est nécessaire pour que Socket.io fonctionne
export async function GET(req: NextRequest) {
  return new Response('Socket.io endpoint enabled', { status: 200 });
}