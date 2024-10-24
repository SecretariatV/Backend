import { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  verification?: string;
  phoneNumber?: string;
  googleId?: string;
  isActive: boolean;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export type { IUser };
