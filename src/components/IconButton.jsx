import React from 'react';

const IconButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
    >
      {children}
    </button>
  );
};

export default IconButton;