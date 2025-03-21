import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { useActionData, useNavigate } from 'react-router-dom';

function Home() {
  const [img, setImg] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { data, isPending, error } = useFetch(
    'https://api.unsplash.com/search/photos?client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns&query=arts&page=10'
  );
  console.log(data);

  useEffect(() => {
    if (data && data.results) {
      setImg(data.results);
    }
  }, [data]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }
  const handleRedirect = (id) => {
    navigate(`/imageinfo/${id}`);
  };

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
          <FaSearch className="absolute right-3 h-4 w-4 opacity-70" />
        </label>
        <button className="p-[16px] bg-blue-400 text-[14px] rounded-md hover:bg-blue-500 transition">
          Search
        </button>
      </form>
      <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {img.map((image) => (
          <div
            onClick={() => handleRedirect(image.id)}
            key={image.id}
            className="overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={image.urls.small}
              alt={image.alt_description || 'Unsplash Image'}
              className="w-full h-48 object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div>
        <button className="bg-gray-500 text-white py-2 px-4 rounded-full w-full cursor-pointer">
          Read More
        </button>
      </div>
    </div>
  );
}

export default Home;
