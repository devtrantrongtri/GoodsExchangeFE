import React, { useEffect } from "react";
import { Line } from "@ant-design/charts";
import useAxios from "../../hooks/useAxios";

const Dashboard: React.FC = () => {
  const { response, error, loading, fetchData } = useAxios<{
    [key: string]: number;
  }>();

  useEffect(() => {
    fetchData({
      url: "products/countByCreate",
      method: "GET",
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = response?.data
    ? Object.entries(response.data)
        .map(([key, value]) => ({
          createAt: new Date(key),
          value: Math.floor(value),
        }))
        .sort((a, b) => a.createAt.getTime() - b.createAt.getTime())
        .map((item) => ({
          createAt: item.createAt.toLocaleDateString(),
          value: item.value,
        }))
    : [];

  const config = {
    data,
    height: 400,
    xField: "createAt",
    yField: "value",
    xAxis: {
      type: "time",
      tickInterval: 24 * 60 * 60 * 1000,
      label: {
        formatter: (v) => new Date(v).toLocaleDateString(),
      },
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum?.createAt,
        value: datum?.value,
      }),
      customContent: (title, items) =>
        `<div>${items
          ?.map(
            (item) => `
          <div class="tooltip-chart">
            <span class="tooltip-item-name">${item?.name}</span>
            <span class="tooltip-item-value">${item?.value}</span>
          </div>`
          )
          .join("")}</div>`,
      showMarkers: true,
      showContent: true,
      position: "right",
      showCrosshairs: true,
    },
  };

  return <Line {...config} />;
};

export default Dashboard;
