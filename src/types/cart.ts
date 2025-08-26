export interface CartProduct {
  productId: string;
  quantity: number;
  title: string;
  price: number;
  offPrice: number;
  discount: number;
}

export interface UserCart {
  products: CartProduct[];
  totalItems: number;
  totalPrice: number;
  totalOffPrice: number;
  payDetail: PayDetail;
  productDetail: CartItemType[];
}

export interface CartResponse {
  message: string;
  cart: UserCart;
}

export interface CartItemType {
  _id: string;
  title: string;
  price: number;
  offPrice: number;
  discount: number;
  quantity: number;
  imageLinks?: string[];
}

export interface PayDetail {
  totalGrossPrice: number;
  totalOffAmount: number;
  totalPrice: number;
}