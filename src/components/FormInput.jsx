import React from 'react';
import { FaSearch } from 'react-icons/fa';

function FormInput({ type, placeholder, name }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-4 pr-10 py-2 border rounded-md"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer">
        <FaSearch className="h-5 w-5 text-gray-400 hover:text-gray-500" />
      </div>
    </div>
  );
}

export default FormInput;
