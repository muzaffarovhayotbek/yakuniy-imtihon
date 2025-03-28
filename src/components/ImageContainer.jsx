import React from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import toast from 'react-hot-toast';

function ImageContainer({ images }) {
  const navigate = useNavigate();
  const { user, dispatch, likedImages } = useGlobalContext();

  const handleRedirect = (id) => {
    navigate(`/imageinfo/${id}`);
  };

  const addLikedImages = (image) => {
    const alreadyAdded = likedImages.some((img) => img.id === image.id);
    if (!alreadyAdded) {
      dispatch({ type: 'LIKE', payload: image });
      toast.success('You liked this image ❤️');
    } else {
      dispatch({ type: 'UNLIKE', payload: image.id });
      toast.error('You deleted this image 🗑️');
    }
  };

  return (
    <div className="relative px-2 md:px-4 lg:px-8">
      <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 480: 2, 768: 3, 1024: 4 }}>
        <Masonry gutter="10px">
          {images.map((image) => {
            const isLiked = likedImages.some((img) => img.id === image.id);

            return (
              <div
                key={image.id}
                className="relative cursor-pointer group"
                onClick={() => handleRedirect(image.id)}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    addLikedImages(image);
                  }}
                  className="absolute h-8 w-8 border rounded-full flex justify-center items-center cursor-pointer right-2 top-2 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black bg-opacity-50"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-600" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </span>

                <img
                  className="w-full h-auto object-cover rounded-md"
                  src={image.urls.regular}
                  alt={image.alt_description || 'Image'}
                />

                <div className="absolute left-2 bottom-2 flex gap-2 items-center invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black bg-opacity-50 p-1 rounded-md">
                  {image.user?.profile_image?.large ? (
                    <>
                      <img
                        src={image.user.profile_image.large}
                        alt={`${image.user.name} avatar`}
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-white text-sm truncate max-w-[100px]">{image.user.name}</p>
                    </>
                  ) : (
                    <p className="text-white text-sm">No Avatar</p>
                  )}
                </div>

                <span className="absolute h-8 w-8 rounded-full flex justify-center items-center cursor-pointer right-2 bottom-2 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-black bg-opacity-50">
                  <a
                    href={
                      image.links?.download
                        ? `${image.links.download}&force=true`
                        : '#'
                    }
                    download
                    onClick={(e) => e.stopPropagation()}
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
  );
}

export default ImageContainer;
