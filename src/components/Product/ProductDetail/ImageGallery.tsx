import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React, { useState } from "react";



const ImageGallery = ({ imgs }: { imgs: string[] }) => {
    const contentStyle: React.CSSProperties = {
        display: 'flex',          // Dùng flexbox để căn giữa ảnh
        justifyContent: 'center',  // Căn giữa theo chiều ngang
        alignItems: 'center',      // Căn giữa theo chiều dọc
        height: '160px',           // Chiều cao khung ảnh
        backgroundColor: '#ffff', // Màu nền cho khung ảnh
      };
    
      const imgStyle: React.CSSProperties = {
        display: 'flex',          // Sử dụng flexbox để căn giữa
        justifyContent: 'center',  // Căn giữa theo chiều ngang
        alignItems: 'center',      // Căn giữa theo chiều dọc
        height: '450px',           // Chiều cao cố định cho khung
        width: '450px',            // Chiều rộng cố định cho khung
        backgroundColor: '#364d79', // Màu nền cho khung
        margin: '0 auto',          // Căn giữa khung theo chiều ngang
      };
    
      return (
        <div className="w-full">
          <Carousel autoplay arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} >
            {imgs.map((img, index) => (
              <div key={index} style={contentStyle}>
                <img style={imgStyle} src={img} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      );
    };

export default ImageGallery;
