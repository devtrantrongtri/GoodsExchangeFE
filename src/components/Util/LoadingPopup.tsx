import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included

const LoadingPopup: React.FC = () => (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <Spin tip="Loading" size="large" className="text-white">
            {/* <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div> */}
        </Spin>
    </div>
);

export default LoadingPopup;
