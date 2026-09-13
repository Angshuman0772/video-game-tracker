import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext.jsx";
import { ToastProvider } from "./context/toastContext.jsx";
import App from "./App.jsx";
import "./index.css";

import "./styles/shared/Buttons.css";
import "./styles/shared/Loader.css";
import "./styles/shared/Panel.css";
import "./styles/shared/Utilities.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
