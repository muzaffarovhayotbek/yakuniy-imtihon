import React, { useEffect, useState } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search';
import { useFetch } from '../../hooks/useFetch';
import ImageContainer from '../../components/ImageContainer';

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get('search');
  return search || 'all';
};

function Home() {
  const searchParamFromAction = useActionData();
  const [search, setSearch] = useState(searchParamFromAction || 'all');
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const dispatch = useDispatch();

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=GqdHvrWr1R2h7h1P0zfChSgcy2L-sPpnuQJXbm_n0Ns&query=${
      searchParamFromAction ?? 'all'
    }&page=${pageParam}`
  );
  console.log(data);

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) =>
        pageParam === 1 ? data.results : [...prevImages, ...data.results]
      );
    }
  }, [data, pageParam]);

  return (
    <div className="container mx-auto my-5 px-10">
      <Search />
      <div className="my-10 relative cursor-pointer">
        <div className="text-center"></div>
        <ImageContainer images={allImages} />
        <div className="my-10">
          <button
            className="bg-blue-500 text-white w-full rounded-lg text-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setPageParam((prev) => prev + 1)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
