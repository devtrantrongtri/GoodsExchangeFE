import React from "react";
import ProductForm from "../../components/Post/ProductForm";
import useAxios from "../../hooks/useAxios";
import { ProductFormData } from "../../types/Product/PostProb";
import { notification } from "antd";

const PostPage: React.FC = () => {
  const { loading, fetchData } = useAxios<ProductFormData>();

  const handleProductSubmit = async (formData: any) => {
    try {
      console.log("Sending data to backend:", formData);
      await fetchData({
        url: "products/create_product",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notification.success({
        message: "Đã tạo bài đăng",
        description: "hê hê.",
        placement: "top",
      });
    } catch (error) {

      notification.error({
        message: "Thất bại",
        description: "có lỗi",
        placement: "top",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleProductSubmit} isLoading={loading} />
    </div>
  );
};

export default PostPage;
