export type UserRole = 'super_admin' | 'village_chief' | 'community_chief' | 'sector_president' | 'member';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  communityId?: string;
  sectorId?: string;
  strikes: number;
  isRestricted: boolean;
  createdAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  phone: string;
  password: string;
  communityId?: string;
  sectorId?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}