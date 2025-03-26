import React from 'react';
import { FaSearch } from 'react-icons/fa';

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input input-border flex items-center gap-2 w-full input-group-sm md:input-md">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="grow"
      />
      <FaSearch className="h-4 w-4 opacity-70" />
    </label>
  );
}

export default FormInput;
