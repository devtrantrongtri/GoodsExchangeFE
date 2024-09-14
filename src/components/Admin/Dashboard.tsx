import React from "react";
import Pie from "./Chart/Pie";
import Line from "./Chart/Line";

const Dashboard: React.FC = () => {
  return (
    <div className="flex justify-between mx-20">
      <div className="w-7/12 shadow-lg p-4 rounded-lg bg-white">
        <h2 className="font-bold">Biểu đồ số lượng sản phẩm theo ngày</h2>
        <Line />
      </div>
      <div className="w-4/12 shadow-lg p-4 rounded-lg bg-white">
        <>
          <h2 className="font-bold">Biểu đồ phần trăm hạng mục sản phẩm</h2>
          <Pie />
        </>
      </div>
    </div>
  );
};

export default Dashboard;
