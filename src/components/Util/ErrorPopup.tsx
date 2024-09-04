// src/components/ErrorPopup.tsx
import React from 'react';

interface ErrorPopupProps {
    message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-red-800 bg-opacity-75 z-50">
            <div className="text-white p-4 rounded shadow-md">
                <h2 className="font-bold">Error</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;
