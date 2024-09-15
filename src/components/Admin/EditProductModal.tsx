import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { CategoryType, ProductFormData } from "../../types/Product/PostProb";
import { useChangeInfoProductMutation } from "../../services/product/product.service";

type AddProductModalProps = {
  isOpen: boolean;
  postId: number;
  onClose: () => void;
  refetch: () => void;
};

const EditProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  postId,
  onClose,
  refetch,
}) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<ProductFormData["status"]>("AVAILABLE");

  const [changeInfoProduct] = useChangeInfoProductMutation();

  const { response, fetchData } = useAxios<CategoryType[]>();

  const handleSubmit = async () => {
    try {
      const body = {
        category_id: categoryId,
        title: title,
        description: description,
        price: price,
        status: status,
      };
      await changeInfoProduct({
        id: postId,
        productData: body,
      }).unwrap();
      
      refetch();
      onClose();
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        try {
          await fetchData({
            url: "category/get_all_categories",
            method: "GET",
          });
          if (response) {
            setCategories(response.data);
          }
        } catch (err) {
          console.error("Error fetching categories:", err);
        }
      };

      fetchCategories();
    }
  }, [response, categories.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            onChange={(e) => setStatus(e.target.value as ProductFormData["status"])}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option value="">Select status</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="UNAVAILABLE">Unavailable</option>
            <option value="BANNED">Banned</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
