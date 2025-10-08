// Product types
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;
  totalStock: number;
  stockDetails: StockDetail[];
}

export interface StockDetail {
  id: string;
  productId: string;
  quantity: number;
  updatedAt: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface RegisterUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

