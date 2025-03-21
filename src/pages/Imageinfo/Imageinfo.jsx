import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
function Imageinfo() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns`
  );

  useEffect(() => {
    if (data) {
      setImage(data);
    }
  }, [data]);

  if (isPending) {
    return <h1>Yuklanmoqda...</h1>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="align-center py-5">
      {image && (
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row mt-5">
          <img
            className="w-full max-w-sm rounded-lg shadow-2xl"
            src={image.urls.regular}
            alt={image.alt_description || 'Image'}
          />
          <div className="max-w-lg md:ml-4">
            <h2 className="text-[20px] uppercase md:text-xl">
              {image.alt_description}
            </h2>
            <p className="py-6 text-[16px] p-[24px]">{image.description}</p>
            <button className="bg-blue-600 text-[14px] p-[16px] rounded-md text-white cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Imageinfo;
