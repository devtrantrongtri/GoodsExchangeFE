import {
  HeartOutlined,
  WechatOutlined,
  FacebookOutlined,
  MessageOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Badge, Input, Modal, notification, Rate } from "antd";
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
import { useGetProfileQuery } from "../../../services/user/user.service";
import { useCreateReportMutation } from "../../../services/report/report.service";

const ProductInfor: React.FC<{ productDetail: ProductType }> = ({
  productDetail,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [addProductToWishList, { isLoading }] =
    useAddProductToWishListMutation();
  const [deleteProductFromWishList] = useDeleteProductFromWishListMutation();
  const { data: wishList, refetch } = useGetWishListQuery();
  const { data: userProfile, isLoading: isLoadingProfile } =
    useGetProfileQuery();
  const [createReport] = useCreateReportMutation();
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

  const handleReport = async () => {
    try {
      const req = {
        product_id: productDetail.productId,
        report_by: userProfile?.data.user.userId,
        report_reason: reportReason,
        report_title: reportTitle,
        report_img: selectedFiles,
      };
      await createReport(req).unwrap();
      notification.success({
        message: "Gửi thành công!",
      });

      setIsModalVisible(false);
    } catch {
      notification.error({
        message: "lỗi",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(e.target.files[0]);
    } else {
      setSelectedFiles(null);
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
    <>
      <Badge.Ribbon text={status} color="green">
        <div className="p-10 w-96 md:w-[460px] mx-auto bg-white shadow-lg rounded-lg">
          {/* Product Name */}
          <div className="flex items-center space-x-[90%]">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div onClick={() => setIsModalVisible(true)}>
              <WarningOutlined />
            </div>
          </div>

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

      <Modal
        title="Report Product"
        visible={isModalVisible}
        onOk={handleReport}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Image:</p>
        <div className="w-full bg-white p-6 rounded-lg shadow-lg space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh sản phẩm
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
                selectedFiles
                  ? "bg-green-200 hover:bg-green-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedFiles ? (
                  <>
                    <p className="mb-2 text-sm text-green-600">
                      {selectedFiles.name}
                    </p>
                    <p className="text-xs text-green-500">
                      You can change the file by clicking here again.
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="images"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleFileChange}
                required
              />
            </label>
          </div>
        </div>

        <p>Title:</p>
        <Input.TextArea
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          rows={4}
          placeholder="Enter your title here"
        />

        <p>Please enter the reason for reporting this product:</p>
        <Input.TextArea
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          rows={4}
          placeholder="Enter your reason here"
        />
      </Modal>
    </>
  );
};

export default ProductInfor;
