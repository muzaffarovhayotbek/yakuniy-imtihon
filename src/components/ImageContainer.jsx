import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaDownload } from "react-icons/fa";

function ImageContainer({ images }) {
  const navigate = useNavigate();
  const { links, urls, alt_description, user, id } = images;

  const handleRedirect = () => {
    navigate(`/imageinfo/${id}`);
  };

  return (
    <div
      onClick={handleRedirect}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
    >
      <img
        src={urls.regular}
        alt={alt_description || "Image"}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <span className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="h-8 w-8 flex justify-center items-center bg-white rounded-full shadow-lg">
          <FaRegHeart className="text-red-600" />
        </span>
        <span className="h-8 w-8 flex justify-center items-center bg-white rounded-full shadow-lg">
          <FaHeart className="text-red-500" />
        </span>
      </span>

      <div className="absolute left-2 bottom-2 flex items-center gap-2 bg-black/50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <img
          src={user.profile_image.large}
          alt={`${user.name} avatar`}
          className="w-9 h-9 rounded-full border border-white"
        />
        <p className="text-white text-lg">{user.name}</p>
      </div>

      <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={`${links.download}&force=true`}
          className="h-8 w-8 flex justify-center items-center bg-white rounded-full shadow-lg"
          download
        >
          <FaDownload className="text-black" />
        </a>
      </span>
    </div>
  );
}

export default ImageContainer;
