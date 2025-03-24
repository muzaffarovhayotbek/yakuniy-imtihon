import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { IoMdDownload } from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../store/likeSlice';
import toast from 'react-hot-toast';
import Search from '../../components/Search';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa6';
function Home() {
  const [allImages, setAllImages] = useState([]);
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/random?count=30&client_id=NtkHPpB0p5hrN3gYQB6w-CLFQ8VD9BGTsbLdwanSrb8`
      );
      setAllImages((prev) => [...prev, ...data]);
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

  const handleDownload = (url) => {
    toast.success('You downloaded the image 🖼️');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto my-5 pl-10 pr-10">
      <Search />
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
                      isLiked ? handleUnLike(image.id) : handleLike(image.id);
                    }}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className="hover-icons absolute bottom-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
                    <a
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
