export interface ProductCategory {
  _id: string;
  title: string;
  slug?: string;
  englishTitle?: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  isLiked: boolean;
  category: ProductCategory | string;
  price: number;
  discount: number;
  countInStock: number;
  description: string;
  imageLinks?: string[];
  brand?: string;
  updatedAt?: string;
  offPrice?: number;
  rating?: number;
  numReviews?: number;
  tags?: string[];
  images?: string[];
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
}

export interface GetOneProductResponse {
  product: Product;
}

export interface LikeProductResponse {
  message: string;
}

export interface AddProductResponse {
  message: string;
  product: Product;
}

export interface UpdateProductResponse {
  message: string;
  product: Product;
}

export interface RemoveProductResponse {
  message: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  slug: string;
  brand: string;
  price: string;
  discount: string;
  offPrice: string;
  countInStock: string;
  imageLink: string;
}

