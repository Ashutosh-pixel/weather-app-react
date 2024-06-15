import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WeatherContextProvider from "./context/WeatherContextProvider.jsx";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WeatherContextProvider>
    <App />
    <ToastContainer></ToastContainer>
  </WeatherContextProvider>
);
