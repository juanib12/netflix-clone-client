import "./Header.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import SearchMovie from "./SearchMovie";

const Header = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const refrescar = () => {
    window.location.reload(true)
  }

  //esto se llama desde el useEffect siempre que userContext.details no tenga ningun valor
  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/me", {
      method: "GET",
      credentials: "include",
      // se pasa el refresth Token como token bearer en el header.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        //la respuesta se guarda en userContext.details
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

  //llamamos a user/logout, de modo que el refreshtoken se elimine de la base de datos y de la cookie.
  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      //configuramos los detalles del  usuario y el token en el contexto como nulo para que se mutre la pagina de inicio de sesion.
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
    });
  };
  return (
    <div>
      <div>
        <div className="center-perfiles">
          <h4 onClick={refrescar}>Movie App</h4>
          <div className="container-perfiles">
            <div className="row-perfil">
              <img src={userContext.details.perfilavatar} />
              <h3>{userContext.details.perfilname}</h3>
              <button onClick={logoutHandler} className="btn-out">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
