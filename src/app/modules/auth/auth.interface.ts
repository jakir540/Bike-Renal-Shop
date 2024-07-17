type UserRole = 'admin' | 'user';

export type TSignupUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
};

export type TUserLogin = {
  id: string;
  password: string;
};
