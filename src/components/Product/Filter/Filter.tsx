import React, { useEffect, useState, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useAxios from "../../../hooks/useAxios";
import { CategoryType } from "../../../types/Product/PostProb";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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
  onApplyFilters,
}) => {
  const { response, error, loading, fetchData } = useAxios<CategoryType[]>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryListRef = useRef<HTMLDivElement>(null);

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

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="w-full md:w-1/4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Filter Products</h2>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
          className="mb-4"
          railStyle={{ backgroundColor: '#e5e7eb' }}
          trackStyle={[{ backgroundColor: '#3b82f6' }]}
          handleStyle={[
            { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
            { borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
          ]}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{minPrice} VND</span>
          <span>{maxPrice} VND</span>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={toggleCategory}
          className="flex justify-between items-center w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
        >
          <span className="font-medium text-gray-700">
            {category || "Select Category"}
          </span>
          {isCategoryOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
        <div 
          ref={categoryListRef}
          className={`mt-2 bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${
            isCategoryOpen ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            {loading ? (
              <p className="p-2 text-gray-500">Loading categories...</p>
            ) : error ? (
              <p className="p-2 text-red-500">Error fetching categories</p>
            ) : (
              <ul>
                <li
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    category === "" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => {
                    setCategory("");
                    setIsCategoryOpen(false);
                  }}
                >
                  All Categories
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.categoryId}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      category === cat.name ? "bg-blue-100" : ""
                    }`}
                    onClick={() => {
                      setCategory(cat.name);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;