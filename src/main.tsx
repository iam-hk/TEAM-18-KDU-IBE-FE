import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/Store.ts";
import { initializeSentry } from "../src/utils/SentryUtils.ts";
// if (import.meta.env.VITE_REACT_APP_ENV === "PROD") {
  initializeSentry();
// }
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  /* </React.StrictMode> */
);
