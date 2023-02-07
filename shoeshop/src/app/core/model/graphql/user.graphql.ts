export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
  isAdmin: boolean;
  createdAt: Date;
}
