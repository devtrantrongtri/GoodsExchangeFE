import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { GlobalResponse } from "../../types/GlobalReponse";
import { ProductType } from "../../types/Product/PostProb";
import Tippy from "@tippyjs/react/headless";
export type ProductResponse = GlobalResponse<ProductType>;

function SearchBar() {
  const { response, error, loading, fetchData } = useAxios<ProductResponse>();
  const [searchResult,setSearchResult] = useState([1,2,3])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (response) console.log(response);

  
  const doSomething = (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn hành động mặc định của form
    fetchData({
      url: `products/with-images`,
      method: "GET",
    });
  };

  return (
    <div className=" relative w-[48rem]">
      <form action="" className="flex flex-row" onSubmit={doSomething}>
        <Tippy
          visible={searchResult.length > 0 ? true : false}
          interactive
          render={(attrs) => (
            <div className="w-[48rem] max-w-5xl bg-white h-40 rounded-b-2xl p-8"  {...attrs}>
              <div className="">
              Ket quadvvvvvvvvvcccccccccccccccccccccccdddddddddddddddddddddddddddddddddddd
              </div>
            </div>
          )}
        >
          <input
            type="text"
            placeholder="Search..."
            className="relative block w-full  py-4 p-8 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onFocus={handleInputFocus}
            // onBlur={handleInputBlur}
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
      {/* {showTooltip && (
        <div className="absolute top-full mt-2 w-40 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg">
          Nhập từ khóa để tìm kiếm
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
