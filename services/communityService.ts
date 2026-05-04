import { connectDB } from '@/lib/db';
import Community from '@/models/Community';
import Sector from '@/models/Sector';
import User from '@/models/User';
import { ROLES } from '@/lib/roles';

export class CommunityService {
  async createCommunity(data: {
    name: string;
    type: 'city' | 'country';
    country: string;
    city?: string;
    chiefId?: string;
  }, creatorRole: string) {
    await connectDB();
    
    if (![ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF].includes(creatorRole as any)) {
      throw new Error('Insufficient permissions');
    }
    
    const community = await Community.create(data);
    return community;
  }
  
  async getAllCommunities() {
    await connectDB();
    const communities = await Community.find()
      .populate('chiefId', 'name email');
    return communities;
  }
  
  async getCommunityById(communityId: string) {
    await connectDB();
    const community = await Community.findById(communityId)
      .populate('chiefId', 'name email');
    
    if (!community) {
      throw new Error('Community not found');
    }
    
    const sectors = await Sector.find({ communityId });
    
    return { community, sectors };
  }
  
  async assignChief(communityId: string, userId: string, adminRole: string) {
    await connectDB();
    
    const admin = await User.findById(adminRole);
    if (!admin || admin.role !== ROLES.SUPER_ADMIN) {
      throw new Error('Insufficient permissions');
    }
    
    const community = await Community.findByIdAndUpdate(
      communityId,
      { chiefId: userId },
      { new: true }
    );
    
    if (!community) {
      throw new Error('Community not found');
    }
    
    // Update user role
    await User.findByIdAndUpdate(userId, { role: ROLES.COMMUNITY_CHIEF });
    
    return community;
  }
}