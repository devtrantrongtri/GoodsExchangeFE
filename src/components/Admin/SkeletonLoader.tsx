// SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full p-4">
      <div className="animate-pulse">
        {/* tít le */}
        <div className="mb-4">
          <div className="bg-gray-300 h-10 w-1/4 rounded"></div>
        </div>

        {/* sợt */}
        <div className="flex mb-10 space-x-4">
          <div className="w-1/3 bg-gray-300 h-10 rounded"></div>
          <div className="w-1/6 bg-gray-300 h-10 rounded"></div>
        </div>

        {/* hít đờ tây bồ */}
        <div className="flex space-x-4 mb-4">
          <div className="w-1/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-3/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
          <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
        </div>

        {/* cần ten tây bồ */}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex space-x-4 py-2">
              <div className="w-1/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-3/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
              <div className="w-2/12 bg-gray-300 h-8 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
