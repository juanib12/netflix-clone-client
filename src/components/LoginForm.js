import { UserContext } from "./UserContext";
import { TextField, Button } from "@mui/material";
import "./Login.css";
import React, { useContext, useState } from "react";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandle = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Algo ha ocurrido mal";

    fetch(process.env.REACT_APP_API_ENDPOINT + "user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Por favor complete todos los campos!");
          } else if (response.status === 401) {
            setError("Email o contraseña incorrectas.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
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

        <form labelFor="email">
          <input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="textfield"
            placeholder="Email"
          />
        </form>
        <form labelFor="password">
          <input
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="textfield"
            placeholder="Contraseña"
          />
        </form>
        <Button
          variant="contained"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Signing In" : "Sign In"}`}
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
