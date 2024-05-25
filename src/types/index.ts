interface Model {
  id: string;
  createdAt: string;
}

export interface User extends Model {
  fullName: string;
  username: string;
  email: string;
}

export interface Team extends Model {
  previousId?: string;
  name: string;
  managerName: string;
  game: string;
  startedOn: string;
  currentlyOn: string;
  currency: string;
  badgePath?: string;
}
