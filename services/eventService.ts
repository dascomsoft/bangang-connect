import { connectDB } from '@/lib/db';
import Event from '@/models/Event';
import Sector from '@/models/Sector';
import User from '@/models/User';
import { ROLES } from '@/lib/roles';

export class EventService {
  async createEvent(data: {
    title: string;
    description: string;
    date: Date;
    location: string;
    sectorId: string;
    createdBy: string;
  }, userRole: string, userSectorId?: string) {
    await connectDB();
    
    // Check permissions
    const canCreate = [ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF, ROLES.SECTOR_PRESIDENT].includes(userRole as any);
    
    if (!canCreate) {
      throw new Error('Insufficient permissions');
    }
    
    // Sector president can only create for their sector
    if (userRole === ROLES.SECTOR_PRESIDENT && userSectorId !== data.sectorId) {
      throw new Error('Cannot create event for other sectors');
    }
    
    const event = await Event.create(data);
    return event;
  }
  
  async getAllEvents(sectorId?: string) {
    await connectDB();
    const query = sectorId ? { sectorId } : {};
    const events = await Event.find(query)
      .sort({ is_boosted: -1, date: 1 })
      .populate('createdBy', 'name email')
      .populate('sectorId', 'name');
    
    return events;
  }
  
  async boostEvent(eventId: string, userId: string) {
    await connectDB();
    
    const user = await User.findById(userId);
    if (!user || ![ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF, ROLES.SECTOR_PRESIDENT].includes(user.role as any)) {
      throw new Error('Insufficient permissions');
    }
    
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    
    const boostExpiry = new Date();
    boostExpiry.setDate(boostExpiry.getDate() + 7);
    
    event.is_boosted = true;
    event.boost_expires_at = boostExpiry;
    await event.save();
    
    return event;
  }
}