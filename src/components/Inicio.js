import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "./Login";
import "./Inicio.css";
import Peliculas from "./Peliculas";
import Header from "./Header";
import TopMovies from "./TopMovies";
import UpcomingMovies from "./UpcomingMovies";
import SeriesPop from "./SeriesPop";
import Genres from "./Genres";
import SearchMovie from "./SearchMovie";
import Loader from "./Loader";

const Inicio = () => {


  return (
    <div className="container">
      <Header />
      <SearchMovie />
      <Peliculas />
      <TopMovies />
      <UpcomingMovies />
      <SeriesPop />
      <Genres />
    </div>
  );
};

export default Inicio;
