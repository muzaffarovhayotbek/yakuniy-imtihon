import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../store/likeSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import Search from '../../components/Search';

function Home() {
  const [allImages, setAllImages] = useState([]);
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const dispatch = useDispatch();

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/photos?per_page=30&client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns`
      );
      setAllImages((prev) => [...prev, ...data]);
      setSearch((prev) => [...prev, ...data]); 
    } catch (error) {
      toast.error('Ошибка загрузки изображений');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="container mx-auto my-5 px-10">
      <Search allImages={allImages} setSearch={setSearch} />

      <div className="my-10 relative cursor-pointer">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
          <Masonry gutter="10px">
            {search.map((image) => {
              const isLiked = likedProducts.includes(image.id);
              return (
                <div
                  key={image.id}
                  className="relative"
                  onClick={() => handleRedirect(image.id)}
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={image.urls.regular}
                    alt={image.alt_description || 'Image'}
                  />
                  <button
                    className="absolute z-50 top-2 right-2 rounded-md text-white text-xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      isLiked ? handleUnLike(image.id) : handleLike(image.id);
                    }}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className="hover-icons absolute bottom-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
                    <a
                      onClick={(e) => e.stopPropagation()}
                      download
                      href={
                        image.links?.download
                          ? image.links.download + '&force=true'
                          : '#'
                      }
                    >
                      <FaDownload className="text-white" />
                    </a>
                  </span>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Home;
