import React, { useEffect, useState } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../store/likeSlice';
import toast from 'react-hot-toast';
import Search from '../../components/Search';
import { useFetch } from '../../hooks/useFetch';

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get('search');
  return search || 'all';
};

function Home() {
  const searchParamFromAction = useActionData();
  const [search, setSearch] = useState(searchParamFromAction || 'all');
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const dispatch = useDispatch();

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns&query=${
      searchParamFromAction ?? 'all'
    }&page=${pageParam}`
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) =>
        pageParam === 1 ? data.results : [...prevImages, ...data.results]
      );
    }
  }, [data, pageParam]);

  const handleLike = (id) => {
    toast.success('You liked this image ❤️');
    dispatch(toggleLike(id));
  };

  const handleUnLike = (id) => {
    toast.error('You unliked this image 🗑️');
    dispatch(toggleLike(id));
  };

  return (
    <div className="container mx-auto my-5 px-10">
      <Search />
      <div className="my-10 relative cursor-pointer">
        {allImages.length === 0 ? (
          <div className="text-center">
            <p className="my-10 text-2xl md:text-4xl">No Images</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white text-sm md:text-base px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Back Home
            </button>
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
          >
            <Masonry gutter="10px">
              {allImages.map((image) => {
                const isLiked = likedProducts.includes(image.id);
                return (
                  <div key={image.id} className="relative">
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
                      {isLiked ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
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
        )}

        <div className="my-10">
          <button
            className="bg-blue-500 text-white w-full rounded-lg text-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setPageParam((prev) => prev + 1)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
