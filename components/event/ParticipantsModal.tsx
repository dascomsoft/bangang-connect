'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

interface Participant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
}

interface ParticipantsModalProps {
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}

export default function ParticipantsModal({ eventId, eventTitle, onClose }: ParticipantsModalProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadParticipants();
  }, [eventId]);

  const loadParticipants = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/participants`);
      const data = await response.json();
      if (data.success) {
        setParticipants(data.participants);
        setCount(data.count);
      }
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Participants</h2>
            <p className="text-sm text-gray-500">{eventTitle} • {count} participant(s)</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : participants.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aucun participant pour le moment</div>
          ) : (
            <div className="space-y-3">
              {participants.map((p) => (
                <div key={p._id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={p.photo || '/default-avatar.png'}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                  <div>
                    <p className="font-semibold">{p.name || 'Anonyme'}</p>
                    <p className="text-sm text-gray-500">{p.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}