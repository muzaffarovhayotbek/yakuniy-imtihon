import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search({ allImages, setSearch }) {
  const [field, setField] = useState('');

  useEffect(() => {
    if (field.trim().length === 0) {
      setSearch(allImages);
    } else {
      const filtered = allImages.filter((item) =>
        item.alt_description?.toLowerCase().includes(field.toLowerCase())
      );
      setSearch(filtered);
    }
  }, [field, allImages, setSearch]);

  return (
    <div>
      <form className="mx-auto flex w-full max-w-96 items-center justify-center gap-3 px-6">
        <label className="relative flex w-full items-center">
          <input
            value={field}
            onChange={(e) => setField(e.target.value)}
            type="text"
            placeholder="Search"
            name="search"
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <FaSearch className="absolute right-3 h-4 w-4 opacity-70" />
        </label>
      </form>
    </div>
  );
}

export default Search;
