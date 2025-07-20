export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
  isVerified: boolean;
  isVerifiedPhoneNumber?: boolean;
  isActive?: boolean;
  biography?: string;
  likedProducts?: string[];
  Products?: string[];
  cart?: {
    products: {
      productId: string;
      quantity: number;
    }[];
  };
  otp?: {
    code: string;
    expiresIn: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetUserResponse {
  user: User;
}

export interface GetUsersResponse {
  users: User[];
}
