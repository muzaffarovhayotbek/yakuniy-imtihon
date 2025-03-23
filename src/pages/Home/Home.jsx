import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { IoMdDownload } from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../store/likeSlice';
import toast from 'react-hot-toast';

function Home() {
  const [allImages, setAllImages] = useState([]);
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likes.likedProducts);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns&query=all&page=${page}&per_page=30`
  );

  const handleRedirect = (id) => {
    navigate(`/imageinfo/${id}`);
  };

  const handleLike = (id) => {
    toast.success('You liked this image ❤️');
    dispatch(toggleLike(id));
  };

  const handleUnLike = (id) => {
    toast.error('You deleted this image 🗑️');
    dispatch(toggleLike(id));
  };

  useEffect(() => {
    if (data && data.results) {
      setAllImages(data.results);
    }
    console.log(data);
  }, [data]);

  if (isPending) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center">Error: {error}</h1>;
  }

  // const handleDownload = (url) => {
  //   toast.success('You downloaded the image 🖼️');
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'image.jpg';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="container mx-auto my-5 pl-10 pr-10">
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
        <button className="p-[16px] bg-blue-400 text-[14px] rounded-md hover:bg-blue-500 transition cursor-pointer">
          Search
        </button>
      </form>
      <div className="my-10 relative">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          <Masonry gutter="10px">
            {allImages.map((image) => {
              const isLiked = likedProducts.includes(image.id);
              return (
                <div
                  key={image.id}
                  className="relative"
                  onClick={() => handleRedirect(image.id)}
                >
                  <img
                    className="w-full h-auto"
                    src={image.urls.regular}
                    alt={image.alt_description || 'Image'}
                  />
                  <button
                    className="absolute z-50 top-2 right-2 rounded-md text-white text-xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLiked) {
                        handleUnLike(image.id);
                      } else {
                        handleLike(image.id);
                      }
                    }}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <a
                  
                    download={image.urls.full}
                    href="/download"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image.urls.full);
                    }}
                  >
                    <IoMdDownload className="absolute bottom-3 right-3 text-white bg-gray-800 p-1 rounded-full text-lg cursor-pointer w-7 h-7 opacity-70" />
                  </a>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-500 text-white py-2 px-4 rounded-full w-full cursor-pointer"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default Home;
