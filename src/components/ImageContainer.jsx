import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
function ImageContainer({ images }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 2,
        750: 3,
        900: 4,
      }}
    >
      <Masonry gutter="10px ">
        {images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.urls.regular}
              alt="img"
              className="rounded-md"
            />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageContainer;
