main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // No file extension needed here; it resolves `.jsx` automatically
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);