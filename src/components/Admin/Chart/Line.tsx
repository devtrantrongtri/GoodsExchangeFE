import React, { useEffect } from "react";
import { Line as AntLine } from "@ant-design/charts";
import useAxios from "../../../hooks/useAxios";
import { Skeleton } from "antd";
import dayjs from "dayjs";

interface DataPoint {
  createAt: string;
  value: number;
}

const Line: React.FC = () => {
  const { response, error, loading, fetchData } = useAxios<{
    [key: string]: number;
  }>();

  useEffect(() => {
    fetchData({
      url: "products/countByCreate",
      method: "GET",
    });
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error}</div>;

  const data: DataPoint[] = response?.data
    ? Object.entries(response.data)
        .map(([key, value]) => ({
          createAt: key,
          value: value,
        }))
        .sort(
          (a, b) =>
            new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
        )
    : [];

  const config = {
    data,
    height: 500,
    xField: "createAt",
    yField: "value",
    xAxis: {
      type: "time",
      tickCount: data.length,
      label: {
        formatter: (v: string) => v.substring(0, 10),
      },
    },
    tooltip: {
      formatter: (datum: DataPoint) => ({
        name: "Date",
        value: `${datum.value}`,
      }),
      customContent: (title: string, items: any[]) => {
        const date = dayjs(title).format("DD/MM/YYYY");
        const value = items?.[0]?.value;
        return `<div>${date}: ${value}</div>`;
      },
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      content: (datum: DataPoint) => datum.value,
      position: "top",
      style: {
        fill: "#000",
        fontSize: 12,
      },
    },
  };

  return <AntLine {...config} />;
};

export default Line;
