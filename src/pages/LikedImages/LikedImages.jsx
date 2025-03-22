import React, { useReducer } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

function LikedImages() {
  const data = useContext(GlobalContext);
  console.log(data);

  return <div>
    LikedImages
  </div>;
}

export default LikedImages;
