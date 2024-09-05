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
  const debounceValue = useDebounce(searchValue, 400);
  const [activeIndex, setActiveIndex] = useState<number>(-1); // Để lưu trữ chỉ mục hiện tại
  const [isOpen, setIsOpen] = useState<boolean>(true); // Để kiểm soát mở/đóng Tippy
  const activeItemRef = useRef<HTMLDivElement | null>(null); // Để tham chiếu đến mục đang được chọn
  const navigate = useNavigate(); // Hook để điều hướng
  useEffect(() => {
    if (debounceValue.trim() === "") {
      setSearchResult([]);
      setIsOpen(false); // Đóng kết quả khi không có tìm kiếm
      return;
    }
    const loadData = async () => {
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
      setIsOpen(true); // Mở Tippy khi có kết quả tìm kiếm
    }
  }, [response]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trimStart();
    setSearchValue(trimmedValue);
    setActiveIndex(-1); // Reset chỉ mục khi có thay đổi
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
      // Xử lý logic khi chọn sản phẩm
      navigate(`/product/productDetail/${selectedProduct.productId}`);
      setIsOpen(false); // Đóng danh sách kết quả sau khi chọn
      event.preventDefault(); // Ngăn việc gửi form mặc định
    }
  };
  // Cuộn danh sách để mục được chọn luôn nằm trong khung nhìn
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest", // Đảm bảo mục luôn trong khung nhìn
        behavior: "smooth", // Cuộn mượt mà
      });
    }
  }, [activeIndex]);

  const handleClickOutside = () => {
    setIsOpen(false)
  }
  return (
    <div className="relative w-[48rem]">
      <form action="" className="flex flex-row">
        <Tippy
          visible={!loading && searchResult.length > 0 && isOpen}
          interactive
          onClickOutside={handleClickOutside}
          
          render={(attrs) => (
            <div {...attrs}>
              <Wrapper>
                <h3 className="font-bold p-4">Products</h3>
                {searchResult.map((product, index) => (
                  <div
                    onClick={() => {
                      setSearchResult([])
                      setSearchValue('')
                    }}
                    key={index}
                    ref={index === activeIndex ? activeItemRef : null} // Gán ref cho mục đang được chọn
                    className={`p-2 cursor-pointer ${
                      index === activeIndex
                        ? "bg-slate-300 text-white"
                        : "bg-white text-black hover:bg-slate-300"
                    }`}
                  >
                    <SearchProduct children={product} />
                  </div>
                ))}
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
            onKeyDown={handleKeyDown} // Lắng nghe sự kiện bàn phím
            onFocus={() => setIsOpen(true)}
          />
        </Tippy>

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
      </form>
    </div>
  );
}

export default SearchBar;
