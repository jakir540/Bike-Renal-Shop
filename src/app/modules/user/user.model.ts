import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { TSignupUser } from '../auth/auth.interface';

const UserSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid user',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TSignupUser>('user', UserSchema);
