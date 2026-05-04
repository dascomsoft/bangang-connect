import { connectDB } from '@/lib/db';
import Ad from '@/models/Ad';
import User from '@/models/User';
import { ROLES } from '@/lib/roles';

export class AdService {
  async createAd(data: {
    title: string;
    content: string;
    sectorId?: string;
    communityId?: string;
    createdBy: string;
  }, userRole: string) {
    await connectDB();
    
    const canCreate = [ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF, ROLES.SECTOR_PRESIDENT].includes(userRole as any);
    
    if (!canCreate) {
      throw new Error('Insufficient permissions');
    }
    
    const ad = await Ad.create(data);
    return ad;
  }
  
  async getAllAds(sectorId?: string, communityId?: string) {
    await connectDB();
    const query: any = {};
    if (sectorId) query.sectorId = sectorId;
    if (communityId) query.communityId = communityId;
    
    const ads = await Ad.find(query)
      .sort({ is_sponsored: -1, createdAt: -1 })
      .populate('createdBy', 'name email');
    
    return ads;
  }
  
  async sponsorAd(adId: string, userId: string) {
    await connectDB();
    
    const user = await User.findById(userId);
    if (!user || ![ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF].includes(user.role as any)) {
      throw new Error('Insufficient permissions');
    }
    
    const ad = await Ad.findById(adId);
    if (!ad) {
      throw new Error('Ad not found');
    }
    
    const sponsorExpiry = new Date();
    sponsorExpiry.setDate(sponsorExpiry.getDate() + 14);
    
    ad.is_sponsored = true;
    ad.sponsor_expires_at = sponsorExpiry;
    await ad.save();
    
    return ad;
  }
}