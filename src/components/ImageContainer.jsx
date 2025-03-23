import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useNavigate } from 'react-router-dom';

function ImageContainer({ images }) {
  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/imageinfo/${id}`);
  };

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
      <Masonry gutter="10px">
        {images.map((image) => (
          <div key={image.id} onClick={() => handleRedirect(image.id)}>
            <img className='w-full h-full object-cover' src={image.urls.regular} alt={image.alt_description || 'Image'} />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageContainer;
