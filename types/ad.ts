export interface IAd {
  _id: string;
  title: string;
  content: string;
  sectorId?: string;
  communityId?: string;
  createdBy: string;
  is_sponsored: boolean;
  sponsor_expires_at?: Date;
  createdAt: Date;
}

export interface IAdCreate {
  title: string;
  content: string;
  sectorId?: string;
  communityId?: string;
}