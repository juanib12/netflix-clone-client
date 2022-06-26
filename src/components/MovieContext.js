import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext({});

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MoviesContextProvider = ({ children }) => {
  const [movieID, setMovieID] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);

  const [movieRecom, setMovieRecom] = useState(null);
  const [movieSimilar, setMovieSimilar] = useState(null);

  const getRecommendationMovie = (movieID) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US`,
    };
    axios
      .request(options)
      .then(function (response) {
        setMovieRecom(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const getSimilarMovie = (movieID) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US`,
    };
    axios
      .request(options)
      .then(function (response) {
        setMovieSimilar(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCreditsMovie = (movieID) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US`,
    };
    axios
      .request(options)
      .then(function (response) {
        setMovieCredits(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //solucionar problema del useEffect cleanup nose q verga.
  const getDetailsMovie = (movieID) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieID}?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES`,
    };
    // console.log(options.url);

    axios
      .request(options)
      .then(function (response) {
        setMovieID(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const contextValue = {
    getDetailsMovie,
    movieID,
    movieCredits,
    getCreditsMovie,
    getSimilarMovie,
    movieSimilar,
    getRecommendationMovie,
    movieRecom,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
