import React, { useEffect, useState } from "react";
import ErrorPopup from "../../components/Util/ErrorPopup";
import LoadingPopup from "../../components/Util/LoadingPopup";
import CardPost from "../../components/Home/Products/CardPost";
import SkeletonPost from "../../components/Home/Products/SkeletonPost";
import useAxios from "../../hooks/useAxios";
import { ProductType } from "../../types/Product/PostProb";

function ProductPage() {
  const { response, error, loading, fetchData } = useAxios<ProductType[]>();
  const [dataFetched, setDataFetched] = useState(false);

  // State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!dataFetched) {
          await fetchData({
            url: "products/with-images",
            method: "GET",
          });
          setDataFetched(true);
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };
    fetchProductData();
  }, [dataFetched, fetchData]);

  // Filter products based on user inputs
  const filteredProducts = response?.data.filter((product) => {
    const isWithinPriceRange =
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice));
    // const matchesCategory =
    //   category === "" || product.category.toLowerCase().includes(category.toLowerCase());
    const matchesName =
      productName === "" || product.title.toLowerCase().includes(productName.toLowerCase());

    return isWithinPriceRange && matchesName;
  });

  return (
    <div style={{ display: "flex", height: "90%" }}>
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Filter Products</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            placeholder="Category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={() => setDataFetched(false)}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      <div className="w-3/4 grid grid-cols-4 gap-8 min-h-96 p-4">
        {error && <ErrorPopup message={error} />}
        {loading && <LoadingPopup />}
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <CardPost key={product.productId} product={product} />
            ))
          : Array.from({ length: 16 }).map((_, index) => (
              <SkeletonPost key={index} />
            ))}
      </div>
    </div>
  );
}

export default ProductPage;
