import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { GlobalResponse } from "../../types/GlobalReponse";
import { ProductType } from "../../types/Product/PostProb";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Popper/Wrapper";
import SearchProduct from "../Home/Products/SearchProduct";
export type ProductResponse = GlobalResponse<ProductType[]>;

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
                  <h3 className="font-bold p-4">Products</h3>
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

  const products: ProductType[] =  [
    {
        "productId": 1,
        "title": "Iphone promax",
        "description": "Hàng dùng còn tốt lắm, bao test , free ship ",
        "price": 99999.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png",
            "https://minhtuanmobile.com/uploads/products/231209051636-iphone-15-pro-max-256gb.jpg",
            "https://minhtuanmobile.com/uploads/products/231209051636-iphone-15-pro-max-256gb1.jpg"
        ]
    },
    {
        "productId": 2,
        "title": "Giải tích 1",
        "description": "mình pass lại cuốn giáo trình này , free ship ",
        "price": 20000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://images.nxbbachkhoa.vn/Picture/2024/8/21/image-20240821085501993.jpg",
            "https://tailieuvnu.com/wp-content/uploads/2021/12/21/Giai-tich-1-Giao-trinh-va-300-bai-tap-co-loi-giai.png",
            "https://vieclamvui.com/upload/img/2021/10/05/bai-tap-giai-tich-1-vieclamvui-1633424018.jpg"
        ]
    },
    {
        "productId": 3,
        "title": "Nước Hoa Hồng",
        "description": "Nước Hoa Hồng Cho Da Nhạy Cảm , free ship ",
        "price": 218000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-318900012-1696306376_img_80x80_d200c5_fit_center.jpg",
            "https://media.hcdn.vn/catalog/product/n/u/nuoc-hoa-hong-klairs-khong-mui-cho-da-nhay-cam-180ml-2_img_80x80_d200c5_fit_center.jpg",
            "https://media.hcdn.vn/catalog/product/n/u/nuoc-hoa-hong-khong-mui-klairs-danh-cho-da-nhay-cam-180ml-1-1681723599_img_80x80_d200c5_fit_center.jpg",
            "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-318900011-1696306306_img_80x80_d200c5_fit_center.jpg"
        ]
    },
    {
        "productId": 4,
        "title": "Bình đun nước siêu tốc",
        "description": "Bình đun siêu tốc Panasonic, free ship ",
        "price": 720000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://cdn.tgdd.vn/Products/Images/1989/284334/Slider/vi-vn-panasonic-17-lit-nc-k101wra--(1).jpg",
            "https://cdn.tgdd.vn/Products/Images/1989/284334/Kit/panasonic-17-lit-nc-k101wra-note.jpg",
            "https://cdn.tgdd.vn/Products/Images/1989/284334/panasonic-17-lit-nc-k101wra-3-2.jpg"
        ]
    },
    {
        "productId": 5,
        "title": "giày cao gót",
        "description": "Giày Cao Gót MWC , free ship ",
        "price": 250000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=/Resources/Product/2024/08/24/z5761313458921-e29daef8eeeb50c3de852b863683373fa03cce03-20e8-4f7a-bec8-3040e5ba3e81.jpg",
            "https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=/Resources/Product/2024/08/24/z5761313410613_58494081d1db0418879e58fdc4f2e103.jpg",
            "https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=/Resources/Product/2024/08/24/z5761313464982-920479d9888d4d4b04ea71b29da3010b07675925-47e8-443f-a853-096ea74243b9.jpg"
        ]
    },
    {
        "productId": 6,
        "title": "Bàn làm viêc",
        "description": "chân sắt chữ U gỗ cao su giá rẻ , free ship ",
        "price": 750000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://bangheth.com/wp-content/uploads/2021/09/Ban-Chan-Sat-chu-u-1m2-Go-Cao-Su.jpg",
            "https://bangheth.com/wp-content/uploads/2021/09/Ban-Chan-Sat-chu-u-1m4-Go-Cao-Su-100x100.jpg",
            "https://bangheth.com/wp-content/uploads/2023/08/anh-thu-ban-u-yem-100x100.jpg"
        ]
    },
    {
        "productId": 7,
        "title": "quần áo thể thao",
        "description": "vải mè gai thái cấp cao, free ship",
        "price": 220000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://product.hstatic.net/200000264441/product/img_4138_223f5685cd5345c1add3c69b1afdcf14_compact.jpg",
            "https://product.hstatic.net/200000264441/product/img_4139_07adc64fb0b64e8fa96f779cf857720a_compact.jpg",
            "https://product.hstatic.net/200000264441/product/img_4136_6f11887b65d54744b9bba0ed9c57a1bc_compact.jpg"
        ]
    },
    {
        "productId": 8,
        "title": "Nước ép",
        "description": "nước ép đóng chai , free ship",
        "price": 260000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://ritajuice.vn/wp-content/uploads/2021/07/n%C6%B0%E1%BB%9Bc-ep-d%C3%A2u-%C4%91%C3%B3ng-chai-350ml.jpg",
            "https://ritajuice.vn/wp-content/uploads/2021/07/N%C6%B0%E1%BB%9Bc-%C3%A9p-xo%C3%A0i-%C4%91ong-chai-350ml.jpg",
            "https://ritajuice.vn/wp-content/uploads/2021/07/N%C6%B0%E1%BB%9Bc-%C3%A9p-tao-%C4%91%C3%B3ng-chai-350ml.jpg"
        ]
    },
    {
        "productId": 9,
        "title": "Thuốc panadol",
        "description": "giảm đau, hạ sốt, free ship",
        "price": 234000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://cdn.thegioididong.com/Products/Images/10244/129157/panadol-extra-hop180v-2-1.jpg",
            "https://cdn.thegioididong.com/Products/Images/10244/129157/panadol-extra-hop180v-3-1.jpg",
            "https://cdn.thegioididong.com/Products/Images/10244/129157/panadol-extra-hop180v-6.jpg"
        ]
    },
    {
        "productId": 10,
        "title": "pate",
        "description": "pate gan heo, free ship",
        "price": 24500.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://vissanmart.com/pub/media/catalog/product/cache/ee97423e9fa68a0b8b7aae16fe28a6ff/p/a/pat_gan_heo_170g.jpg"
        ]
    },
    {
        "productId": 11,
        "title": "đường mía",
        "description": "đường cát trắng 1 cây 12kg, free ship",
        "price": 320000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://lzd-img-global.slatic.net/g/p/6662242d5f0eda9486be30f6c4b5a46a.jpg_320x320.jpg_100x100.jpg",
            "https://laz-img-sg.alicdn.com/p/3e6c4161235a87a457670e389d615598.jpg",
            "https://laz-img-sg.alicdn.com/p/86054fe20853ae0893d8e368f416faf9.jpg"
        ]
    },
    {
        "productId": 12,
        "title": "Nhẫn",
        "description": "Nhẫn Vàng trắng 10K đính đá, free ship",
        "price": 3566000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://cdn.pnj.io/images/detailed/209/sp-gnxmxmw000121-nhan-vang-trang-10k-dinh-da-ecz-pnj-1.png",
            "https://cdn.pnj.io/images/detailed/209/sp-gnxmxmw000121-nhan-vang-trang-10k-dinh-da-ecz-pnj-2.png",
            "https://cdn.pnj.io/images/detailed/209/sp-gnxmxmw000121-nhan-vang-trang-10k-dinh-da-ecz-pnj-3.png"
        ]
    },
    {
        "productId": 13,
        "title": "rong biển ăn liền",
        "description": "Rong biển giòn trộn gia vị, free ship",
        "price": 36500.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://cdn.tgdd.vn/Products/Images/7083/223762/bhx/sellingpoint.jpg",
            "https://cdn.tgdd.vn/Products/Images/7083/223762/bhx/rong-bien-gion-ofood-tron-gia-vi-goi-30g-202006121359311663.jpg",
            "https://cdn.tgdd.vn/Products/Images/7083/223762/bhx/rong-bien-gion-ofood-tron-gia-vi-goi-30g-202006121359304999.jpg"
        ]
    },
    {
        "productId": 14,
        "title": "Nồi",
        "description": "Bộ nồi Inox Elmich EL-2322NK, free ship",
        "price": 1000000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://cdn.nguyenkimmall.com/images/thumbnails/70/40/detailed/859/10053164-bo-noi-inox-elmich-el-2322nk.jpg",
            "https://cdn.nguyenkimmall.com/images/thumbnails/70/40/detailed/859/10053164-bo-noi-inox-elmich-el-2322nk-2_kgst-wc.jpg",
            "https://cdn.nguyenkimmall.com/images/thumbnails/70/40/detailed/859/10053164-bo-noi-inox-elmich-el-2322nk-3_t4rc-n1.jpg"
        ]
    },
    {
        "productId": 15,
        "title": "đồ chơi cho trẻ em",
        "description": "Bộ đồ chơi lắp ghép xếp hình trẻ em phát triển trí tuệ thông minh, free ship",
        "price": 150000.00,
        "status": "AVAILABLE",
        "create_at": 1725344118000,
        "imageUrls": [
            "https://mysun.vn/wp-content/uploads/2021/06/bo-do-choi-ghep-xep-hinh-tre-em-cho-be-3-4-5-6-tuoi-100x100.png",
            "https://mysun.vn/wp-content/uploads/2021/06/bo-do-choi-nam-cham-xep-hinh-thong-minh-cho-tre-be-100x100.png",
            "https://mysun.vn/wp-content/uploads/2021/06/bo-do-choi-lap-rap-kich-thich-thong-minh-cho-tre-3-4-5-tuoi-100x100.png"
        ]
    }
];