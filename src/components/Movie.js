import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useMovieContext } from "./MovieContext";

const Movie = () => {
  const { movieID } = useMovieContext();

  return (
    <div>
      <Header />
      <h1>{movieID.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movieID.poster_path}`} />
    </div>
  );
};

export default Movie;
