import { UserContext } from "./UserContext";
import { Button } from "@mui/material";
import "./Login.css";
import React, { useContext, useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState(""); //se usa para mostrar un mensaje de error en caso de que falle.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  //primero deshabilitamos el envio predeterminado del formulario con e.preventDefault();
  const formSubmitHandle = (e) => {
    e.preventDefault();
    setError("");

    const genericErrorMessage = "Algo ha ocurrido mal, inténtelo mas tarde.";

    //llamamos a user/login con los parametros usuario y contraseña en el body.
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) {
            //en caso de error mostramos el mensaje
            setError("Por favor complete todos los campos!");
          } else if (response.status === 401) {
            setError("Email o contraseña incorrectas.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          //de ser exitoso guardamos el valor del token en el contexto del user.
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setError(genericErrorMessage);
      });
  };
  return (
    <div>
      {error && (
        <h2 className="error-register" intent="danger">
          {error}
        </h2>
      )}
      <form onSubmit={formSubmitHandle} className="form-login">
        <h2>¡Hola! Para seguir, ingresá tu email y contraseña.</h2>
        <form>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="textfield"
            placeholder="Email"
          />
        </form>
        <form>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="textfield"
            placeholder="Contraseña"
          />
        </form>
        <Button
          variant="contained"
          type="submit"
          className="btn-login"
        >
          Iniciar sesion
        </Button>
        <div className="form-footer">
          <p>¿Necesitas ayuda?</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
