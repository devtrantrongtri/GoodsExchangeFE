import { User } from "../user";

export type CardPostProps = {
  name: string,
  img: string,
  price: number,
  datePost: string
}
// casi dungf chinhs home,productDetail,product page
export type ProductType = {
  productId: number,
  seller: SellerType,
  category: CategoryType,
  title: string,
  description: string,
  price: number,
  status: string,
  create_at: number,
  imageUrls: string[]
}

// interface cát gô ry
export interface CategoryType {
  categoryID: number;
  categoryId: number;
  name: string;
}

// Type for individual product
interface Product {
  productId: number;
  title: string;
  description: string;
  price: number;
  status: "AVAILABLE" | "SOLD_OUT" | "DISCONTINUED";
  create_at: number; // Timestamp in milliseconds
  imageUrls: string[];
}

// Type for the data containing product list
export interface ProductData {
  content: Product[];
}

// Type for the API response
export interface ProductResponse {
  code: number; // e.g., 200
  msg: string; // e.g., "success"
  data: ProductData;
}
// get 1 san pham cu the
export interface ProductDetailResponse {
  code: number; // e.g., 200
  msg: string; // e.g., "success"
  data: ProductType;
}
// dung cho get Post cua seller
export interface ProductSellerResponse {
  code: number; // e.g., 200
  msg: string; // e.g., "success"
  data: ProductType[];
}
// Định nghĩa kiểu dữ liệu cho thông tin phân trang
interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface PaginatedProductsResponse {
  content: ProductType[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
export type SellerType = {
  userId: number;
  username: string;
  email: string;
  roles: string; // "CLIENT"
  phoneNumber: string;
  address: string;
  createdAt: [number, number, number, number, number, number]; // Year, Month, Day, Hour, Minute, Second
};

export interface ProductFormData {
  category_id: number;
  title: string;
  description: string;
  price: number;
  status: "AVAILABLE" | "SOLD" | "UNAVAILABLE" | "BANNED";
}

export interface Comment {
  comment_id: number;
  product: ProductType;
  user: User;
  text: string;
  createAt: [number, number, number, number, number, number];
}

export interface CommentResponse {
  code: number;
  msg: string;
  data: Comment[];
}

export interface CommentRequest {
  productId: string;
  userId: string;
  message: string;
}