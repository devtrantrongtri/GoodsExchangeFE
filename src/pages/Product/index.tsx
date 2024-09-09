import React, { useEffect, useState } from "react";
import ErrorPopup from "../../components/Util/ErrorPopup";
import LoadingPopup from "../../components/Util/LoadingPopup";
import CardPost from "../../components/Home/Products/CardPost";
import SkeletonPost from "../../components/Home/Products/SkeletonPost";
import useAxios from "../../hooks/useAxios";
import { ProductType } from "../../types/Product/PostProb";
import Filter from "../../components/Product/Filter/Filter";
import { useLocation } from "react-router-dom";

function ProductPage() {
  const { response, error, loading, fetchData } = useAxios<ProductType[]>();
  const [dataFetched, setDataFetched] = useState(false);

  // State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");

    if (categoryParam) {
      setCategory(categoryParam);
    }

    const fetchProductData = async () => {
      if (!dataFetched) {
        await fetchData({
          url: "products/with-images",
          method: "GET",
        });
        setDataFetched(true);
      }
    };
    fetchProductData();
  }, [location.search]);

  // lọc
  const filteredProducts = response?.data.filter((product) => {
    const isPriceFilterDisabled = minPrice === "0" && maxPrice === "0";

    const isWithinPriceRange =
      isPriceFilterDisabled ||
      ((minPrice === "" || product.price >= Number(minPrice)) &&
        (maxPrice === "" || product.price <= Number(maxPrice)));

    const matchesCategory =
      category === "" ||
      product.category.name.toLowerCase() === category.toLowerCase();

    const matchesName =
      productName === "" ||
      product.title.toLowerCase().includes(productName.toLowerCase());

    return isWithinPriceRange && matchesName && matchesCategory;
  });

  return (
    <div style={{ display: "flex", height: "90%", margin: "0 60px" }}>
      <Filter
        minPrice={minPrice}
        maxPrice={maxPrice}
        category={category}
        productName={productName}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setCategory={setCategory}
        setProductName={setProductName}
        onApplyFilters={() => setDataFetched(false)}
      />

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
