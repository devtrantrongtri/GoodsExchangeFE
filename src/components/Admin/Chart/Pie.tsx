import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import useAxios from "../../../hooks/useAxios";
import { ProductResponse, ProductType } from "../../../types/Product/PostProb";
import { Skeleton } from "antd";

const ProductCategoryPieChart: React.FC = () => {
  const { response, fetchData, error, loading } = useAxios<ProductResponse>();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData({
      url: "products/get_all_product",
      method: "GET",
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      const categoryCount: { [key: number]: { name: string; value: number } } =
        response.data.reduce(
          (
            acc: { [key: number]: { name: string; value: number } },
            product: ProductType
          ) => {
            const { categoryID, name } = product.category;
            if (!acc[categoryID]) {
              acc[categoryID] = { name, value: 0 };
            }
            acc[categoryID].value += 1;
            return acc;
          },
          {}
        );
      const pieData = Object.values(categoryCount);

      setData(pieData);
      console.log(pieData);
    }
  }, [response]);

  if (loading) return <Skeleton/>;

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "name",
    radius: 1,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    title: {
      visible: true,
      text: "Biểu Đồ Số Lượng Sản Phẩm Theo Ngày",
      style: {
        fontSize: 16,
        fontWeight: 500,
        color: "#000",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
};

export default ProductCategoryPieChart;
