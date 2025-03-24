import { createContext, useContext, useEffect, useReducer } from 'react';

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('my-splash-data')) || {};
};

const changeState = (state, action) => {
  const { type, payload } = action;

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
  const [state, dispatch] = useReducer(changeState, {
    user: null,
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

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
