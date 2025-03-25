import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import App from "./App";
import Register, { action as RegisterAction } from "./pages/Register/Register"; // Import 
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
    action: RegisterAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </Provider>
);
