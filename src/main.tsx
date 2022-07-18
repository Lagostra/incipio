import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import {
  handle_callback,
  isSignedIn,
  REDIRECT_PATH,
  signIn,
} from "./utils/auth";

if (window.location.pathname.startsWith(REDIRECT_PATH)) {
  handle_callback();
} else if (!isSignedIn()) {
  signIn();
} else {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
