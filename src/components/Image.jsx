import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';

function Image({ image }) {
  const { likedImages, dispatch } = useGlobalContext();
  const { links, urls, alt_description, user } = image;
  console.log(likedImages);

  return (
    <div className="relative group">
    
    </div>
  );
}

export default Image;
