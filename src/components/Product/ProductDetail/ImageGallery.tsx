import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React from "react";

const ImageGallery = ({ imgs }: { imgs: string[] }) => {
  return (
    <div className="w-full ">
      <Carousel
        autoplay
        infinite
        nextArrow={<div><h1 className="text-black text-4xl"><DoubleRightOutlined /></h1></div>}
        prevArrow={<div><h1 className="text-black text-4xl"><DoubleLeftOutlined /></h1></div>}
        arrows
      >
        {imgs.map((img, index) => (
          <div key={index} className="flex justify-center items-center h-96 w-96 bg-white ">
            <img className="h-80 w-80  mx-auto" src={img} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};


export default ImageGallery;
