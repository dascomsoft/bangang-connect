export type CommunityType = 'city' | 'country';

export interface ICommunity {
  _id: string;
  name: string;
  type: CommunityType;
  country: string;
  city?: string;
  chiefId?: string;
  createdAt: Date;
}

export interface ICommunityCreate {
  name: string;
  type: CommunityType;
  country: string;
  city?: string;
  chiefId?: string;
}



interface Community {
  _id: string;
  name: string;
  type: 'city' | 'country';
  country: string;
  city?: string;
}

interface Sector {
  _id: string;
  name: string;
  description?: string;
  communityId: string;
}