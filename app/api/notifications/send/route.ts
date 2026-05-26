export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import webpush from 'web-push';
import PushSubscription from '@/models/PushSubscription';

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { userId, title, body, url } = await request.json();
    
    const subscriptionDoc = await PushSubscription.findOne({ userId });
    if (!subscriptionDoc) {
      return NextResponse.json({ error: 'Aucune subscription trouvée' }, { status: 404 });
    }
    
    const payload = JSON.stringify({
      title,
      body,
      icon: '/icon-192.png',
      badge: '/badge.png',
      data: { url }
    });
    
    await webpush.sendNotification(subscriptionDoc.subscription, payload);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send notification error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}