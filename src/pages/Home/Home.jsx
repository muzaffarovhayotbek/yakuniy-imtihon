import React from 'react';
import search from '../../assets/search-svgrepo-com.svg';

function Home() {
  return (
    <div className="container mx-auto my-5">
      <form className="mx-auto flex w-full max-w-96 items-center justify-center gap-3 px-6">
        <label className="relative flex w-full items-center">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <img src={search} alt="" width={16} className="absolute right-3" />
        </label>
        <button className="p-[16px] bg-blue-400 text-[14px] rounded-md hover:bg-blue-500 transition">
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
