import { z } from 'zod';

export const createAdSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  sectorId: z.string().optional(),
  communityId: z.string().optional()
});

export const sponsorAdSchema = z.object({
  adId: z.string()
});