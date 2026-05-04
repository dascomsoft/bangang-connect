export interface ISector {
  _id: string;
  name: string;
  description?: string;
  communityId: string;
  presidentId: string;
  members: string[];
  createdAt: Date;
}

export interface ISectorCreate {
  name: string;
  description?: string;
  communityId: string;
  presidentId: string;
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