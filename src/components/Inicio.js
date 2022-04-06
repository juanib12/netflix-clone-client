import { Button, Modal } from "@mui/material";
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

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
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
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
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
