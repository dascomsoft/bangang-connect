import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { ROLES } from '@/lib/roles';

export class UserService {
  async getAllUsers(filters?: { role?: string; communityId?: string }) {
    await connectDB();
    const query: any = {};
    
    if (filters?.role) query.role = filters.role;
    if (filters?.communityId) query.communityId = filters.communityId;
    
    const users = await User.find(query)
      .select('-password')
      .populate('communityId', 'name')
      .populate('sectorId', 'name');
    
    return users;
  }
  
  async updateUserRole(userId: string, newRole: string, adminRole: string) {
    await connectDB();
    
    // Check permissions
    const admin = await User.findById(adminRole);
    if (!admin || admin.role !== ROLES.SUPER_ADMIN) {
      throw new Error('Insufficient permissions');
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
  
  async addStrike(userId: string, adminRole: string) {
    await connectDB();
    
    const admin = await User.findById(adminRole);
    if (!admin || ![ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF].includes(admin.role)) {
      throw new Error('Insufficient permissions');
    }
    
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    user.strikes += 1;
    if (user.strikes >= 3) {
      user.isRestricted = true;
    }
    
    await user.save();
    
    return { strikes: user.strikes, isRestricted: user.isRestricted };
  }
}