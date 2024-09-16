// import { ProductType } from "../Product/PostProb";
import { CategoryType, SellerType } from "../Product/PostProb";
import { User } from "../user";
interface ProductTypeWishList  {
    product_id: number,
    seller: SellerType,
    category: CategoryType,
    title: string,
    description: string,
    price: number,
    status: string,
    create_at: number,
    imageUrls: string[]
  }
export interface WishListItem {
    id: number;
    user: User;
    product: ProductTypeWishList;
    createdAt: number; // Timestamp
    products: ProductTypeWishList[]; // Có thể là danh sách sản phẩm, nếu không thì để trống
}

// Type cho danh sách wishList trả về từ API
export type WishListResponse = WishListItem[];