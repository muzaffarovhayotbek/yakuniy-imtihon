import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ImageContainer from '../../components/ImageContainer';
import { NavLink } from 'react-router-dom';

function LikedImages() {
  const { likedImages } = useGlobalContext();

  if (likedImages.length === 0) {
    return (
      <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 text-center">
        <h2 className='text-2xl md:text-4xl mt-50'>You haven't chosen any images yet</h2>
        <NavLink to='/'>
          <button className='bg-blue-500 text-white py-2 px-4 text-sm md:text-base md:px-6 rounded-md'>
            Back home
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="container mx-auto items-center mt-20 p-4">
      <ImageContainer images={likedImages} />
    </div>
  );
}

export default LikedImages;
