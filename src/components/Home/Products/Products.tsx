import React from 'react';
import CardPost from './CardPost';
import { CardPostProps } from '../../../types/Product/PostProb';








function Products() {
  return (
    <div className=''>
      <h1 className='font-bold text-2xl  pt-6 mb-10'>
        Tin đăng mới nhất
      </h1>
      <div className='grid grid-cols-4 gap-8 '>
        {products.map((product, index) => (
            <CardPost key={index} product={product} />
         
        ))}
      </div>
      <div className="flex justify-end mt-7">
              <a href="#" className="text-red-600 hover:text-gray-700 ">
                Xem nhiều hơn...
              </a>
            </div>
    </div>
  );
}

export default Products;


const products : CardPostProps[] = [
  { name: 'MacBook Pro', price: 129000, img: "https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png", datePost: '2024-08-28' },
  { name: 'iPhone 14', price: 99900, img: "https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png", datePost: '2024-09-01' },
  { name: 'Samsung Galaxy S23', price: 79900, img: "https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg", datePost: '2024-08-14' },
  { name: 'Dell XPS 13', price: 109900, img: "https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg", datePost: '2024-07-21' },
  { name: 'MacBook Pro', price: 129000, img: "https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png", datePost: '2024-08-28' },
  { name: 'PS 5', price: 99900, img: "https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/may-ps5-slim-standardl-edition-korea-00-700x700.jpg", datePost: '2024-09-01' },
  { name: 'MX Master 3S', price: 1300, img: "https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1", datePost: '2024-08-14' },
  { name: 'loa fake', price: 109900, img: "https://cdn.chotot.com/knqOZjnqz7pe81j-8dRJNQ6qO1kdrqNGt897mfR_8oI/preset:listing/plain/c2a4488905cee8bb2eac27398b9dff65-2894548325744029484.jpg", datePost: '2024-07-21' },
  { name: 'MacBook Pro', price: 129000, img: "https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png", datePost: '2024-08-28' },
  { name: 'iPhone 14', price: 99900, img: "https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png", datePost: '2024-09-01' },
  { name: 'Samsung Galaxy S23', price: 79900, img: "https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg", datePost: '2024-08-14' },
  { name: 'Dell XPS 13', price: 109900, img: "https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg", datePost: '2024-07-21' },
  { name: 'MacBook Pro', price: 129000, img: "https://minhtuanmobile.com/uploads/products/macbook-pro-14inch-2023-m3-gray-231205114826-231205114826_thumb.png", datePost: '2024-08-28' },
  { name: 'iPhone 14', price: 99900, img: "https://minhtuanmobile.com/uploads/products/iphone-15-pro-max-blue-1-230913060803-230913180803_thumb.png", datePost: '2024-09-01' },
  { name: 'Samsung Galaxy S23', price: 79900, img: "https://minhtuanmobile.com/uploads/products/samsung-galaxy-s23-ultra-thumbnail-xanh-230214032652-230214152652_thumb.jpg", datePost: '2024-08-14' },
  { name: 'Dell XPS 13', price: 109900, img: "https://imagor.owtg.one/unsafe/460x460/filters:quality(100)/https://media-api-beta.thinkpro.vn/media/core/products/2023/6/26/dell-xps-13-9310-2-in-1-thinkpro-41t.jpg", datePost: '2024-07-21' },
];