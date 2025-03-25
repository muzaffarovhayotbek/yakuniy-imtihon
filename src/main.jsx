import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import App from "./App";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
