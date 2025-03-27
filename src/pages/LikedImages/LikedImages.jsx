import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ImageContainer from '../../components/ImageContainer';

function LikedImages() {
  const { likedImages } = useGlobalContext();

  if (likedImages.length === 0) {
    return <h2 className='text-center mt-2'>You haven't chosen any images yet</h2>;
  }

  return (
    <div className="items-center">
      <ImageContainer images={likedImages} />
    </div>
  );
}

export default LikedImages;
