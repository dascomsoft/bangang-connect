import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hashPassword, comparePassword, generateToken } from '@/lib/auth';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export class AuthService {
  async register(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    communityId?: string;
    sectorId?: string;
  }) {
    await connectDB();
    
    // Validation
    if (!isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!isValidPhone(userData.phone)) {
      throw new Error('Invalid phone number');
    }
    
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }]
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create user
    const hashedPassword = await hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role: 'member',
      strikes: 0
    });
    
    const token = generateToken(user._id.toString(), user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return { user: userResponse, token };
  }
  
  async login(email: string, password: string) {
    await connectDB();
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    
    if (user.isRestricted) {
      throw new Error('Account is restricted');
    }
    
    const token = generateToken(user._id.toString(), user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return { user: userResponse, token };
  }
  
  async getUserById(userId: string) {
    await connectDB();
    const user = await User.findById(userId)
      .select('-password')
      .populate('communityId', 'name type')
      .populate('sectorId', 'name');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
}