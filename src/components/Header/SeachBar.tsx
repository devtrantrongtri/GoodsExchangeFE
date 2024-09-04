import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { GlobalResponse } from "../../types/GlobalReponse";
import { ProductType } from "../../types/Product/PostProb";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Wrapper";
import SearchProduct from "../Home/Products/SearchProduct";
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
            <div className=""  {...attrs}>
                <Wrapper>
                  <h3 className="font-bold">Products</h3>
                  <SearchProduct children={products[1]}/>
                  <SearchProduct children={products[2]}/>
                  <SearchProduct children={products[3]}/>

                </Wrapper>
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

  const products: ProductType[] = [
    { 
      productId: 1, 
      title: 'MacBook Pro', 
      description: 'Powerful laptop with M3 chip', 
      price: 129000, 
      status: 'new', 
      create_at: 1693190400000, // Timestamp for '2024-08-28'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png"] 
    },
    { 
      productId: 2, 
      title: 'iPhone 14', 
      description: 'Latest iPhone with A15 Bionic chip', 
      price: 99900, 
      status: 'new', 
      create_at: 1693526400000, // Timestamp for '2024-09-01'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png"] 
    },
    { 
      productId: 3, 
      title: 'Samsung Galaxy S23', 
      description: 'High-performance smartphone with great camera', 
      price: 79900, 
      status: 'new', 
      create_at: 1691961600000, // Timestamp for '2024-08-14'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg"] 
    },
    { 
      productId: 4, 
      title: 'Dell XPS 13', 
      description: 'Compact and powerful ultrabook', 
      price: 109900, 
      status: 'used', 
      create_at: 1689897600000, // Timestamp for '2024-07-21'
      imageUrls: ["https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg"] 
    },
    { 
      productId: 5, 
      title: 'MacBook Pro', 
      description: 'Powerful laptop with M3 chip', 
      price: 129000, 
      status: 'new', 
      create_at: 1693190400000, // Timestamp for '2024-08-28'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png"] 
    },
    { 
      productId: 6, 
      title: 'PS 5', 
      description: 'Next-gen gaming console', 
      price: 99900, 
      status: 'new', 
      create_at: 1693526400000, // Timestamp for '2024-09-01'
      imageUrls: ["https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/may-ps5-slim-standardl-edition-korea-00-700x700.jpg"] 
    },
    { 
      productId: 7, 
      title: 'MX Master 3S', 
      description: 'High precision wireless mouse', 
      price: 1300, 
      status: 'new', 
      create_at: 1691961600000, // Timestamp for '2024-08-14'
      imageUrls: ["https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1"] 
    },
    { 
      productId: 8, 
      title: 'Loa Fake', 
      description: 'Portable Bluetooth speaker', 
      price: 109900, 
      status: 'used', 
      create_at: 1689897600000, // Timestamp for '2024-07-21'
      imageUrls: ["https://cdn.chotot.com/knqOZjnqz7pe81j-8dRJNQ6qO1kdrqNGt897mfR_8oI/preset:listing/plain/c2a4488905cee8bb2eac27398b9dff65-2894548325744029484.jpg"] 
    },
    { 
      productId: 9, 
      title: 'MacBook Pro', 
      description: 'Powerful laptop with M3 chip', 
      price: 129000, 
      status: 'new', 
      create_at: 1693190400000, // Timestamp for '2024-08-28'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png"] 
    },
    { 
      productId: 10, 
      title: 'iPhone 14', 
      description: 'Latest iPhone with A15 Bionic chip', 
      price: 99900, 
      status: 'new', 
      create_at: 1693526400000, // Timestamp for '2024-09-01'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png"] 
    },
    { 
      productId: 11, 
      title: 'Samsung Galaxy S23', 
      description: 'High-performance smartphone with great camera', 
      price: 79900, 
      status: 'new', 
      create_at: 1691961600000, // Timestamp for '2024-08-14'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg"] 
    },
    { 
      productId: 12, 
      title: 'Dell XPS 13', 
      description: 'Compact and powerful ultrabook', 
      price: 109900, 
      status: 'used', 
      create_at: 1689897600000, // Timestamp for '2024-07-21'
      imageUrls: ["https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg"] 
    },
    { 
      productId: 13, 
      title: 'MacBook Pro', 
      description: 'Powerful laptop with M3 chip', 
      price: 129000, 
      status: 'new', 
      create_at: 1693190400000, // Timestamp for '2024-08-28'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png"] 
    },
    { 
      productId: 14, 
      title: 'iPhone 14', 
      description: 'Latest iPhone with A15 Bionic chip', 
      price: 99900, 
      status: 'new', 
      create_at: 1693526400000, // Timestamp for '2024-09-01'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png"] 
    },
    { 
      productId: 15, 
      title: 'Samsung Galaxy S23', 
      description: 'High-performance smartphone with great camera', 
      price: 79900, 
      status: 'new', 
      create_at: 1691961600000, // Timestamp for '2024-08-14'
      imageUrls: ["https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg"] 
    },
    { 
      productId: 16, 
      title: 'Dell XPS 13', 
      description: 'Compact and powerful ultrabook', 
      price: 109900, 
      status: 'used', 
      create_at: 1689897600000, // Timestamp for '2024-07-21'
      imageUrls: ["https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg"] 
    },
  ];
  