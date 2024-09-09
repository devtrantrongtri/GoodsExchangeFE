import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useAxios from "../../../hooks/useAxios";

interface FilterProps {
  minPrice: string;
  maxPrice: string;
  category: string;
  productName: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setCategory: (value: string) => void;
  setProductName: (value: string) => void;
  onApplyFilters: () => void;
}

interface CategoryType {
  categoryId: number;
  name: string;
}

const Filter: React.FC<FilterProps> = ({
  minPrice,
  maxPrice,
  category,
  productName,
  setMinPrice,
  setMaxPrice,
  setCategory,
  setProductName,
  onApplyFilters,
}) => {
  const { response, error, loading, fetchData } = useAxios<CategoryType[]>();
  const [categories, setCategories] = useState<CategoryType[]>([]);

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
  }, [fetchData, response, categories.length]);

  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Filter Products</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={[Number(minPrice), Number(maxPrice)]}
          onChange={(values) => {
            setMinPrice(values[0].toString());
            setMaxPrice(values[1].toString());
          }}
          className="p-4"
        />

        <div className="mb-4">
          <div className="flex justify-between mt-2">
            <span>{minPrice}</span>
            <span>{maxPrice}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>

        <div className="pt-6">
          <div className="space-y-6">
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p>Error fetching categories</p>
            ) : (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={onApplyFilters}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
