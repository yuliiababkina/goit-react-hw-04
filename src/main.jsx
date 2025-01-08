import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./components/App.module.css";

import App from "./components/App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Toaster />
        <App />
    </StrictMode>
);
