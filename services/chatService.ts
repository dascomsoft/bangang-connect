import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import { filterBadWords } from '@/lib/utils';

export class ChatService {
  async sendMessage(data: {
    content: string;
    senderId: string;
    sectorId: string;
  }) {
    await connectDB();
    
    const user = await User.findById(data.senderId);
    if (!user || user.isRestricted) {
      throw new Error('Cannot send message');
    }
    
    const { filtered, hasBadWords } = filterBadWords(data.content);
    
    if (hasBadWords) {
      // Add strike
      user.strikes += 1;
      if (user.strikes >= 3) {
        user.isRestricted = true;
      }
      await user.save();
      throw new Error('Message contains inappropriate language');
    }
    
    const message = await Message.create({
      ...data,
      content: filtered,
      isFiltered: hasBadWords
    });
    
    const populatedMessage = await message.populate('senderId', 'name email');
    return populatedMessage;
  }
  
  async getMessages(sectorId: string, limit = 50) {
    await connectDB();
    const messages = await Message.find({ sectorId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'name email')
      .sort({ createdAt: 1 });
    
    return messages;
  }
}