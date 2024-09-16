import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { CategoryType } from "../../types/Product/PostProb";
import { Button, Spin } from "antd";

interface ProductFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const { response, fetchData } = useAxios<CategoryType[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", String(categoryId));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", String(price));

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("images", file);
      });
    }

    onSubmit(formData);
  };

  useEffect(() => {
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

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchData, response]);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col md:flex-row gap-6">
      {/* Ảnh */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh sản phẩm</label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
              selectedFiles && selectedFiles.length > 0
                ? "bg-green-200 hover:bg-green-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {selectedFiles && selectedFiles.length > 0 ? (
                <>
                  <p className="mb-2 text-sm text-green-600">
                    {selectedFiles.length} file(s) selected
                  </p>
                  <p className="text-xs text-green-500">
                    You can change the files by clicking here again.
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

      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
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
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            rows={4}
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-[25%] mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button 
            type="primary" 
            htmlType="submit" 
            disabled={isLoading} 
            className="w-[10%] h-10 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? <Spin /> : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
