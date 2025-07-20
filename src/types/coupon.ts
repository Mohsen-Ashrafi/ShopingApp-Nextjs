export type CouponType = "percent" | "fixedProduct";

export interface CouponProduct {
  _id: string;
  title: string;
}

export interface Coupon {
  _id: string;
  code: string;
  type: CouponType;
  amount: number;
  usageCount: number;
  usageLimit: number;
  expireDate: string;
  productIds: CouponProduct[];
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean
}

export interface GetAllCouponsResponse {
  coupons: Coupon[];
}

export interface CouponResponse {
  message: string;
  coupon: Coupon;
}

export interface RemoveCouponResponse {
  message: string;
}

export interface AddCouponPayload {
  code: string;
  type: CouponType;
  amount: number;
  usageLimit: number;
  expireDate: string;
  productIds: string[];
}

export interface UpdateCouponParams {
  id: string;
  data: Partial<AddCouponPayload>;
}


export interface ProductOption {
  _id: string;
  title: string;
}

export interface FormData {
  code: string;
  amount: string;
  usageLimit: string;
}