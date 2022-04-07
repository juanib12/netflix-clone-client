import "./Login.css";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "./UserContext";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import App from "../App.js";
import Loader from "./Loader";

export default function Login() {
  const [userContext, setUserContext] = useContext(UserContext);

  //declaramos verifyUser con useCallback para evitar una nueva declaracion cuando el componente se vuelva a renderizar.
  const verifyUser = useCallback(() => {
    fetch("http://localhost:3001/user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      //si devuelve una respuesta buena, guarda el token en el contexto.
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        //si devuelve un error, establecemos el token en nulo en el contexto.
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      //llamamos a refreshToken cada 5 minutos para renovar el token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  //se llama a verifyuser al cargar la pagina.
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  console.log(userContext);

  return userContext.token === null ? (
    <div>
      <div className="sombra-img">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/e690a920-9a22-4d39-8db2-545a95a0f460/AR-es-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          width={1519}
          height={1200}
        />
      </div>
      <div className="container-all">
        <div className="container-login">
          <LoginForm />
        </div>
        <div className="container-register">
          <RegisterForm />
        </div>
      </div>
    </div>
  ) : !userContext.token ? (
    <Loader />
  ) : (
    <App />
  );
}
