import { createContext, useContext, useEffect, useReducer } from 'react';

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  try {
    const savedData = JSON.parse(localStorage.getItem('my-splash-data'));
    return (
      savedData || {
        user: null,
        authReady: false,
        likedImages: [],
        downloadImage: [],
      }
    );
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return { user: null, authReady: false, likedImages: [], downloadImage: [] };
  }
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'AUTH_READY':
      return { ...state, authReady: true };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'LIKE':
      return { ...state, likedImages: [...state.likedImages, action.payload] };
    case 'UNLIKE':
      return {
        ...state,
        likedImages: state.likedImages.filter(
          (image) => image.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, dataFromLocalStorage());

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
