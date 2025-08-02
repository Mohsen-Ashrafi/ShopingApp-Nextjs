import { UserCart } from "./cart";
import { Payment } from "./payment";

export type Role = "USER" | "ADMIN";

export interface CartProduct {
  productId: string;
  quantity: number;
}

export interface Product {
  _id: string;
  title: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: Role;
  isVerified: boolean;
  isVerifiedPhoneNumber?: boolean;
  isActive: boolean
  biography?: string;
  likedProducts?: string[];
  Products?: Product[];
  otp?: {
    code: string;
    expiresIn: string;
  };
  createdAt: string;
  updatedAt: string;
  cart?: {
    products: CartProduct[];
  };
  message: string
}

// Responses
export interface GetUsersResponse {
  users: User[];
}


export interface GetOneUserResponse {
  user: User;
}

// OTP & Profile Types

export type GetUserProfileResponse = {
  user: User;
  cart: UserCart;
  payments: Payment[];
};

export interface GetOtpRequest {
  phoneNumber: string;
}

export interface GetOtpResponse {
  message: string;
  otp: string;
  role: "ADMIN" | "USER";
  phoneNumber: string;
  expiresIn: number;
}

export interface CheckOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface CheckOtpResponse {
  token: string;
  message: string;
  user: {
    isActive: boolean;
  };
}

export interface CompleteProfileRequest {
  name: string;
  email: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UpdateProfileResponse {
  user: User;
  message: string;
}

