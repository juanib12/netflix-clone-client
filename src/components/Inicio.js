
import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "./Login";
import { UserContext } from "./UserContext";
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
  const [userContext, setUserContext] = useContext(UserContext);

  //esto se llama desde el useEffect siempre que userContext.details no tenga ningun valor
  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/me", {
      method: "GET",
      credentials: "include",
      //la respuesta se guarda en userContext.details
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          //podria ser cuando el token expira, recarga la pagina
          window.location.reload();
        } else {
          //si hay algun error, establecemos userContext.details en nulo.
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
     // solo cuando los detalles del usuario no existen.
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return userContext.details === null ? (
    <Login />
  ) : !userContext.details ? (
    <Loader />
  ) : (
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
