export type CardPostProps = {
  name: string,
  img: string,
  price: number,
  datePost: string
}

export type ProductType = {
  productId: number,
  category: {
    categoryId: number,
    name: string,
    categoryID: number,
  },
  title: string,
  description: string,
  price: number,
  status: string,
  create_at: number,
  imageUrls: string[]
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

export interface ProductDetailResponse {
  code: number; // e.g., 200
  msg: string; // e.g., "success"
  data: Product;
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
  content: Product[];
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