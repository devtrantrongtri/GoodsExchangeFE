import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React, { useRef, useState } from "react";

const ImageGallery = ({ imgs }: { imgs: string[] }) => {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    carouselRef.current.goTo(index);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full pt-10">
      <div className="flex justify-between items-center ">
        {/* Mũi tên quay về */}
        <button
          onClick={() => carouselRef.current.prev()}
          className="text-black text-4xl"
        >
          <DoubleLeftOutlined />
        </button>

        {/* Carousel hiển thị ảnh */}
        <div className="w-60 h-60  md:w-96 md:h-96">
          <Carousel
            ref={carouselRef}
            beforeChange={(from, to) => setCurrentIndex(to)}
            arrows={false}
            infinite
            autoplay
          >
            {imgs.map((img, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-60 h-60  md:w-96 md:h-96 bg-white"
              >
                <img className="w-50 h-50 md:h-80 md:w-80 mx-auto" src={img} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Mũi tên tiến tới */}
        <button
          onClick={() => carouselRef.current.next()}
          className="text-black text-4xl"
        >
          <DoubleRightOutlined />
        </button>
      </div>

      {/* Hình thu nhỏ bên dưới */}
      <div className="flex justify-center space-x-4 mt-4">
        {imgs.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer p-1 ${
              currentIndex === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            <img className="h-20 w-20 object-cover" src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
