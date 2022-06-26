import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Movie from "./components/Movie";
import { MoviesContextProvider } from "./components/MovieContext";
import { ClerkProvider } from "@clerk/clerk-react";

const frontendApi = "clerk.alive.pup-96.lcl.dev"

ReactDOM.render(
  <ClerkProvider frontendApi={frontendApi}>
    <BrowserRouter>
      <MoviesContextProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie" element={<Movie />} />
          </Routes>
        </React.StrictMode>
      </MoviesContextProvider>
    </BrowserRouter>
  </ClerkProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
