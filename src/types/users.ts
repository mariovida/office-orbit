export type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
};

export type UserCredentials = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: number;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  token?: string;
};
