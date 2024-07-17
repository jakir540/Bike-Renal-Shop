import { USER_ROLE } from './user.constant';

export type useRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: useRole;
};
export type TUserRole = keyof typeof USER_ROLE;
