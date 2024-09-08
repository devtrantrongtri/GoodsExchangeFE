import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { ProductType } from "../../types/Product/PostProb";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Wrapper";
import SearchProduct from "../Home/Products/SearchProduct";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { response, error, loading, fetchData } = useAxios<ProductType[]>();
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Trạng thái kiểm tra đã tìm kiếm
  const debounceValue = useDebounce(searchValue, 400);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const activeItemRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (debounceValue.trim() === "") {
      setSearchResult([]);
      setIsOpen(false);
      setHasSearched(false); // Đặt lại trạng thái tìm kiếm khi giá trị trống
      return;
    }
    const loadData = async () => {
      setHasSearched(true); // Đánh dấu đã thực hiện tìm kiếm
      await fetchData({
        url: `products/keyword/${debounceValue}`,
        method: "GET",
      });
    };
    loadData();
  }, [debounceValue]);

  useEffect(() => {
    if (response) {
      setSearchResult(response.data);
      setIsOpen(true);
    }
  }, [response]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trimStart();
    setSearchValue(trimmedValue);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResult.length === 0) return;

    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < searchResult.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchResult.length - 1
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      const selectedProduct = searchResult[activeIndex];
      if (selectedProduct) {
        navigate(`/product/productDetail/${selectedProduct.productId}`);
      } else {
        navigate(`/product/productDetail?keyword=${debounceValue}`);
      }
      setIsOpen(false);
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResult([]);
    setIsOpen(false);
  };
  return (
    <div className="relative w-[48rem] ">
      <form action="" className="flex flex-row">
        <Tippy
          visible={!loading && isOpen}
          interactive
          onClickOutside={handleClickOutside}
          render={(attrs) => (
            <div {...attrs}>
              <Wrapper>
                {/* <h3 className="font-bold p-4">Products</h3> */}
                {hasSearched && searchResult.length === 0 ? (
                  <div
                    className="p-2 cursor-pointer bg-white text-black hover:bg-slate-300"
                    onClick={() => {
                      navigate(
                        `/product/productDetail?keyword=${debounceValue}`
                      );
                      setIsOpen(false);
                    }}
                  >
                    Search for "<strong>{debounceValue}</strong>"
                  </div>
                ) : (
                  searchResult.map((product, index) => (
                    <div
                      onClick={() => {
                        navigate(`/product/productDetail/${product.productId}`);
                        setSearchResult([]);
                        setSearchValue("");
                      }}
                      key={index}
                      ref={index === activeIndex ? activeItemRef : null}
                      className={`p-2 cursor-pointer ${
                        index === activeIndex
                          ? "bg-slate-300 text-white"
                          : "bg-white text-black hover:bg-slate-300"
                      }`}
                    >
                      <SearchProduct children={product} />
                    </div>
                  ))
                )}
              </Wrapper>
            </div>
          )}
        >
          <input
            type="text"
            placeholder="Search..."
            className="relative block w-full py-4 p-8 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />
        </Tippy>
        {loading && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-cyan-500 rounded-l-none rounded-r-3xl border border-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-600-800"
        >
          <svg
            className="w-8 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        {/* Nút x để xóa tìm kiếm */}
        {searchValue && !loading && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute top-0 end-14 p-2.5 text-sm font-medium h-full text-gray-500 hover:text-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Clear Search</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default SearchBar;