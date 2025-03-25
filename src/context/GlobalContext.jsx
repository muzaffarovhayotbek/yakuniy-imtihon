  import { createContext, useContext, useEffect, useReducer } from 'react';
  import LikedImages from '../pages/LikedImages/LikedImages';

  export const GlobalContext = createContext({});

  const dataFromLocalStorage = () => {
    return (
      JSON.parse(localStorage.getItem('my-splash-data')) || {
        user: null,
        LikedImages: [],
        downloadImage: [],
      }
    );
  };

  const changeState = (state, action) => {
    const { type, payload } = action;
    switch (type) {
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
    switch (type) {
      case 'LOGIN':
        return { ...state, user: payload };
      case 'LOGOUT':
        return { ...state, user: null };
      default:
        return state;
    }
  };

  export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());

    useEffect(() => {
      localStorage.setItem('my-splash-data', JSON.stringify(state));
    }, [state]);

    return (
      <GlobalContext.Provider value={{ ...state, dispatch }}>
        {children}
      </GlobalContext.Provider>
    );
  }

  export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error(
        'useGlobalContext must be used within a GlobalContextProvider'
      );
    }
    return context;
  };
