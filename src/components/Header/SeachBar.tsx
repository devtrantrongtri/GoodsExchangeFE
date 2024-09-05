import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { ProductType } from "../../types/Product/PostProb";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Wrapper";
import SearchProduct from "../Home/Products/SearchProduct";
import useDebounce from "../../hooks/useDebounce";


function SearchBar() {
  const { response, error, loading, fetchData } = useAxios<ProductType[]>();
  const [searchResult,setSearchResult] = useState<ProductType[]>([])
  const [searchValue,setSearchValue] = useState<string>('')
  const debounceValue = useDebounce(searchValue,400)
  useEffect(() => {
    if (debounceValue.trim() === "") {
      setSearchResult([]);
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

  useEffect(()=>{
    if (response) {
      setSearchResult(response.data);
    }
  },[response])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trimStart();
    setSearchValue(trimmedValue);
  }

  return (
    <div className=" relative w-[48rem]" >
      <form action="" className="flex flex-row" >
        <Tippy
          visible={!loading&&searchResult.length > 0 }
          interactive
          render={(attrs) => (
            <div  {...attrs}>
                <Wrapper>
                  <h3 className="font-bold p-4">Products</h3>
                {response&&response.data.map((product,index)=> (
                  <SearchProduct children={product} key={index}/>))}

                </Wrapper>
            </div>
          )}
        >
          <input
            type="text"
            placeholder="Search..."
            className="relative block w-full  py-4 p-8 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchValue}
            onChange={handleInputChange}
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