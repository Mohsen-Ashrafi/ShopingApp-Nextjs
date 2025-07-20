export type PaymentStatus = "COMPLETED" | "FAILED" | "PENDING";

export interface PaymentUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface PaymentProduct {
  _id: string;
  title: string;
}

export interface PaymentCart {
  productDetail: PaymentProduct[];
}

export interface Payment {
  _id: string;
  invoiceNumber: string;
  description: string;
  user: PaymentUser;
  cart: PaymentCart;
  amount: number;
  paymentMethod: string;
  createdAt: string;
  status: PaymentStatus;
  updatedAt?: string;
  authority?: string;
}

export interface GetAllPaymentsResponse {
  payments: Payment[];
}

export interface GetOnePaymentResponse {
  payment: Payment[];
}

export interface CreatePaymentResponse {
  message: string;
  payment: Payment;
}
