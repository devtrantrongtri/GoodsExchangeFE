import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useAxios from "../../../hooks/useAxios";
import { CategoryType } from "../../../types/Product/PostProb";

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

const Filter: React.FC<FilterProps> = ({
  minPrice,
  maxPrice,
  category,
  productName,
  setMinPrice,
  setMaxPrice,
  setCategory,
  setProductName,
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
            <span>{minPrice} VND</span>
            <span>{maxPrice} VND</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="relative">
          {loading ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : error ? (
            <p className="text-red-500">Error fetching categories</p>
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>
    </div>
  );
};

export default Filter;
