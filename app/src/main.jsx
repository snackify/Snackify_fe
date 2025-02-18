import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/UserContext"; // Ensure the correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider> {/* Wrap App inside UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
