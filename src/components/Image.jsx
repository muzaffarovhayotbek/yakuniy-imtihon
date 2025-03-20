import React from 'react';

function Image({ image }) {
  return (
    <div>
      <img src={image.urls.regular} alt="image" />
    </div>
  );
}

export default Image;
