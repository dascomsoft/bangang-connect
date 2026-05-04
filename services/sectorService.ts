import { connectDB } from '@/lib/db';
import Sector from '@/models/Sector';
import User from '@/models/User';
import Community from '@/models/Community';
import { ROLES } from '@/lib/roles';

export class SectorService {
  async createSector(data: {
    name: string;
    description?: string;
    communityId: string;
    presidentId: string;
  }, creatorRole: string, creatorId: string) {
    await connectDB();
    
    const canCreate = [ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF].includes(creatorRole as any);
    
    if (!canCreate) {
      throw new Error('Insufficient permissions');
    }
    
    // Check if community exists
    const community = await Community.findById(data.communityId);
    if (!community) {
      throw new Error('Community not found');
    }
    
    // Check if user exists
    const president = await User.findById(data.presidentId);
    if (!president) {
      throw new Error('President not found');
    }
    
    const sector = await Sector.create(data);
    
    // Update president role
    await User.findByIdAndUpdate(data.presidentId, { 
      role: ROLES.SECTOR_PRESIDENT,
      sectorId: sector._id,
      communityId: data.communityId
    });
    
    return sector;
  }
  
  async getAllSectors(communityId?: string) {
    await connectDB();
    const query = communityId ? { communityId } : {};
    const sectors = await Sector.find(query)
      .populate('presidentId', 'name email')
      .populate('communityId', 'name type');
    
    return sectors;
  }
  
  async getSectorById(sectorId: string) {
    await connectDB();
    const sector = await Sector.findById(sectorId)
      .populate('presidentId', 'name email')
      .populate('communityId', 'name type')
      .populate('members', 'name email');
    
    if (!sector) {
      throw new Error('Sector not found');
    }
    
    return sector;
  }
  
  async joinSector(sectorId: string, userId: string) {
    await connectDB();
    
    const sector = await Sector.findById(sectorId);
    if (!sector) {
      throw new Error('Sector not found');
    }
    
    if (!sector.members.includes(userId as any)) {
      sector.members.push(userId as any);
      await sector.save();
    }
    
    await User.findByIdAndUpdate(userId, { sectorId });
    
    return sector;
  }
}