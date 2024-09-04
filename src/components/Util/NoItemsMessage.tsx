// src/components/NoItemsMessage.tsx
import React from 'react';

interface NoItemsMessageProps {
    message?: string;
}

const NoItemsMessage: React.FC<NoItemsMessageProps> = ({ message = 'No items' }) => {
    return (
        <div className="text-center text-gray-500">
            {message}
        </div>
    );
};

export default NoItemsMessage;
