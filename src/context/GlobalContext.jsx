import { createContext, useEffect, useReducer } from 'react';
import LikedImages from '../pages/LikedImages/LikedImages';

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem('my-splash-data')) || {
      LikedImages: [],
      downloadImage: [],
    }
  );
};
const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'LIKE':
      return {
        ...state,
        LikedImages: [...state.LikedImages, payload],
      };
    case 'UNLIKE':
      return {
        ...state,
        LikedImages: state.LikedImages.filter((image) => image.id !== payload),
      };

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: false,
    LikedImages: [],
    downloadImage: [],
  });

  useEffect(() => {
    localStorage.setItem('my-splash-data', JSON.stringify(state));
  }, [state]);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
