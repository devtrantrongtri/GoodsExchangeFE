import React from "react";
import ProductForm from "../../components/Post/ProductForm";
import useAxios from "../../hooks/useAxios";
import { ProductFormData } from "../../types/Product/PostProb";

const PostPage: React.FC = () => {
  const { fetchData } = useAxios<ProductFormData>();

  const handleProductSubmit = async (formData: any) => {
    try {
      console.log("Sending data to backend:", formData);
      await fetchData({
        url: "products/create_product",
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default PostPage;
