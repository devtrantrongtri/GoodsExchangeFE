import React from 'react';

interface ErrorPopupProps {
    message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-red-800 bg-opacity-75 z-50">
            <div className="bg-white text-red-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 w-full max-w-sm">
                <h2 className="font-bold text-xl mb-2">Error</h2>
                <p className="text-sm mb-4">{message}</p>
                <div className="flex flex-col items-center">
                    <button
                        className="bg-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800 transition duration-300 ease-in-out mb-4"
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                    <span className="text-gray-600 mb-4">or</span>
                    <p className="text-sm mb-4">Please contact me to fix this error:</p>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=100011178460755"
                            className="text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://github.com/devtrantrongtri"
                            className="text-gray-800 hover:text-gray-600"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopup;
