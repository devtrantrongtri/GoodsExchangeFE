import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SkeletonLoader from "./SkeletonLoader";

interface ProductData {
  productId: number;
  title: string;
  description: string;
  price: number;
  status: "AVAILABLE" | "SOLD_OUT" | "DISCONTINUED";
  created_at: number;
  imageUrls: string[];
}

const Product: React.FC = () => {
  const { response, error, loading, fetchData } = useAxios<ProductData[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const productsPerPage = 10;

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

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allProductIds = (response?.data || []).map(
        (product) => product.productId
      );
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleProductAdded = () => {
    setDataFetched(false); // Reset the state to allow refetching
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset page to 0 on search
  };

  if (loading) return <SkeletonLoader/>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = (response?.data || []).filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const formatDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col gap-0">
      <h1 className="font-bold text-2xl">List product</h1>
      <div className="flex mb-10">
        <form className="max-w-md mx-auto w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search product..."
              required
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 h-auto text-center me-2 mb-2"
        >
          Add product
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr
                  key={product.productId}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-product-${product.productId}`}
                        type="checkbox"
                        checked={selectedProducts.includes(product.productId)}
                        onChange={() => toggleSelectProduct(product.productId)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-product-${product.productId}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4"><img src={product.imageUrls[0]} alt="" className="w-16 h-16"/></td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.title}
                  </td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.status}</td>
                  <td className="px-6 py-4">
                    {formatDateFromTimestamp(product.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav
        aria-label="Page navigation example"
        className="mt-4 flex justify-end"
      >
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
                currentPage === 0
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "hover:bg-gray-100 hover:text-gray-700"
              } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index)}
                aria-current={currentPage === index ? "page" : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                } dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                currentPage === totalPages - 1
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "hover:bg-gray-100 hover:text-gray-700"
              } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Product;
