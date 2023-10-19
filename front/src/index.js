import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const rootEl = document.getElementById("root");
const root = rootEl && ReactDOM.createRoot(rootEl);
if (root) {
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  );
} else {
  alert("React not starting");
}
