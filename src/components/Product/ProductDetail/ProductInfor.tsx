import {
  HeartOutlined,
  WechatOutlined,
  FacebookOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Badge, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ProductDetailResponse,
  ProductType,
  SellerType,
} from "../../../types/Product/PostProb";
import {
  useAddProductToWishListMutation,
  useDeleteProductFromWishListMutation,
  useGetWishListQuery,
} from "../../../services/WishList/wishList.service";

const ProductInfor: React.FC<{ productDetail: ProductType }> = ({
  productDetail,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addProductToWishList, { isLoading }] = useAddProductToWishListMutation();
  const [deleteProductFromWishList] = useDeleteProductFromWishListMutation();
  const { data: wishList ,refetch} = useGetWishListQuery();
  const navigate = useNavigate();
  // Hàm kiểm tra sản phẩm có trong wishlist không
  const checkIfProductInWishlist = () => {
    if (wishList && wishList.length > 0) {
      return wishList.some(
        (item) => item.product.product_id === productDetail.productId
      );
    }
    return false;
  };

  // Kiểm tra và cập nhật trạng thái khi component được render hoặc khi danh sách wishlist thay đổi
  useEffect(() => {
    const isInWishlist = checkIfProductInWishlist();
    setIsWishlisted(isInWishlist);
  }, [wishList, productDetail]);

  const handleAddToWishlist = async () => {
    try {
      if (isWishlisted) {
        // Nếu đã yêu thích, xóa sản phẩm khỏi wishlist
        await deleteProductFromWishList(productDetail.productId).unwrap();
        setIsWishlisted(false);
      } else {
        // Nếu chưa yêu thích, thêm sản phẩm vào wishlist
        await addProductToWishList({
          product_id: productDetail.productId,
        }).unwrap();
        setIsWishlisted(true);
      }
      refetch();
    } catch (err) {
      console.error("Failed to add product to wishlist:", err);
    }
  };

  const handleShare = (platform: string) => {
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank"
      );
    } else if (platform === "message") {
      alert("Chia sẻ qua message chưa được tích hợp.");
    }
  };

  // extract infor product from parent (productdetail)
  const { title, description, price, status, create_at, category, seller } =
    productDetail;

  // form date for product posted
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (cộng thêm 1 vì tháng bắt đầu từ 0)
    const year = date.getFullYear(); // Lấy năm
    return `${day}/${month}/${year}`; // Trả về chuỗi ngày theo định dạng dd/mm/yyyy
  };

  // logic chat hanle navigate
  const handleChatClick = (seller: SellerType) => {
    navigate("/chat", { state: { recipient: seller } });
  };

  return (
    <Badge.Ribbon text={status} color="green">
      <div className="p-10 w-96 md:w-[460px] mx-auto bg-white shadow-lg rounded-lg">
        {/* Product Name */}

        <h1 className="text-xl font-bold text-gray-800">{title}</h1>

        {/* Category */}
        <p className="text-lg text-gray-600">Loại: {category.name}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <Rate
            className="text-cyan-800"
            disabled
            allowHalf
            defaultValue={2.5}
          />
          <span className="ml-2 text-lg text-gray-600">2.5 / 5</span>
        </div>

        {/* Price */}
        <h2 className="mt-4 text-lg text-red-500 font-semibold">
          Giá: {price.toLocaleString()} VND
        </h2>

        {/* Product Status */}
        <p className="text-lg text-gray-600">
          Trạng thái: <Badge count={status} showZero color="green" />
        </p>

        {/* Created At */}
        <p className="text-lg text-gray-600">
          Ngày đăng:
          <Badge count={formatDate(create_at)} showZero color="blue" />{" "}
        </p>

        {/* Wishlist Button */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAddToWishlist}
            className={`flex items-center gap-2 py-2 px-4 rounded-md text-white ${
              isWishlisted ? "bg-red-500" : "bg-gray-500"
            } hover:bg-red-600`}
            disabled={isLoading}
          >
            <HeartOutlined />
            {isWishlisted ? "Đã yêu thích" : "yêu thích"}
          </button>

          {/* Contact Button */}
          <button
            onClick={() => handleChatClick(seller)}
            className="flex items-center gap-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            <MessageOutlined />
            Chat với người bán
          </button>
          {/* </Link> */}
        </div>

        {/* Share Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <h3 className="text-lg text-gray-600">Share:</h3>
            <button
              onClick={() => handleShare("facebook")}
              className="text-blue-600"
            >
              <FacebookOutlined style={{ fontSize: "24px" }} />
            </button>
            <button
              onClick={() => handleShare("message")}
              className="text-green-600"
            >
              <MessageOutlined style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>

        {/* Product Description */}
        <h1 className="font-bold text-black">Description :</h1>
        <p className="mt-2 text-gray-600 h-40 overflow-auto">{description}</p>
      </div>
    </Badge.Ribbon>
  );
};

export default ProductInfor;
