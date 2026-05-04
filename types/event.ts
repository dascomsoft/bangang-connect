export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  sectorId: string;
  createdBy: string;
  is_boosted: boolean;
  boost_expires_at?: Date;
  createdAt: Date;
}

export interface IEventCreate {
  title: string;
  description: string;
  date: Date;
  location: string;
  sectorId: string;
}