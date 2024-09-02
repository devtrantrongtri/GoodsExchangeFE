import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl font-semibold mt-4">Oops! Page Not Found</p>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="mt-6 text-lg text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
