import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import useAxios from "../../hooks/useAxios";
import { ProductResponse, ProductType } from "../../types/Product/PostProb";
import dayjs from "dayjs";

const Dashboard: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState("Last 7 days");
  const [chartData, setChartData] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const { response, error, loading, fetchData } = useAxios<any>();

  useEffect(() => {
    const end = dayjs().endOf("day").unix().toString();
    const start = dayjs().subtract(7, "day").startOf("day").unix().toString();
    setStartDate(start);
    setEndDate(end);
  }, []);

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     fetchData({
  //       url: "products/getByDate",
  //       method: "GET",
  //       params: {
  //         startDate: startDate,
  //         endDate: endDate,
  //       },
  //     });
  //   }
  // }, [startDate, endDate, fetchData]);

  useEffect(() => {
    if (response) {
      const data = response.data.map((item: ProductType) => item.price);
      setChartData(data);
    }
  }, [response]);

  const options: ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: { enabled: false },
      toolbar: { show: false },
    },
    tooltip: {
      enabled: true,
      x: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: 0 },
    },
    series: [{ name: "Product Prices", data: chartData, color: "#1A56DB" }],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  const toggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left,
      });
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (label: string, start: string, end: string) => {
    setDropdownLabel(label);
    setStartDate(start);
    setEndDate(end);
    setDropdownOpen(false);
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            32.4k
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Users this week
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>

      <div ref={chartRef} id="area-chart"></div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            {dropdownLabel}
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "fixed",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() =>
                      handleOptionClick(
                        "Yesterday",
                        getStartOfDay(-1),
                        getEndOfDay(-1)
                      )
                    }
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() =>
                      handleOptionClick(
                        "Today",
                        getStartOfDay(0),
                        getEndOfDay(0)
                      )
                    }
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() =>
                      handleOptionClick(
                        "Last 7 days",
                        getStartOfDay(-7),
                        getEndOfDay(0)
                      )
                    }
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() =>
                      handleOptionClick(
                        "Last 30 days",
                        getStartOfDay(-30),
                        getEndOfDay(0)
                      )
                    }
                  >
                    Last 30 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() =>
                      handleOptionClick(
                        "Last 90 days",
                        getStartOfDay(-90),
                        getEndOfDay(0)
                      )
                    }
                  >
                    Last 90 days
                  </a>
                </li>
              </ul>
            </div>
          )}

          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Users Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

function getStartOfDay(daysAgo: number): string {
  return dayjs().subtract(daysAgo, "day").startOf("day").unix().toString();
}

function getEndOfDay(daysAgo: number): string {
  return dayjs().subtract(daysAgo, "day").endOf("day").unix().toString();
}

export default Dashboard;
