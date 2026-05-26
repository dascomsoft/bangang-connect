

'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

export default function TestParticipantsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('Événements reçus:', data);
        setEvents(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Participants</h1>
      
      {events.length === 0 ? (
        <p className="text-red-500">Aucun événement trouvé !</p>
      ) : (
        events.map((event: any) => (
          <div key={event._id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold">{event.title}</h3>
            <p>Participants: {event.participants?.length || 0}</p>
            <Button 
              variant="secondary" 
              className="mt-2"
              onClick={() => alert(`ID: ${event._id}\nParticipants: ${event.participants?.length || 0}`)}
            >
              Voir tout
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
