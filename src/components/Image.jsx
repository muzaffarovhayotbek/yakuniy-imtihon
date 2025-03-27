import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';

function Image({ image }) {
  const { likedImages, dispatch } = useGlobalContext();
  const { links, urls, alt_description, user } = image;

  return (
    <div className="relative group">
      <span>like</span>
      <img
        src={urls.regular}
        alt={alt_description}
        className="w-full rounded-md"
      />
      <span>User</span>
      <span>Download</span>
    </div>
  );
}

export default Image;
