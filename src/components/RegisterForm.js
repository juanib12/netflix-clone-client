import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { TextField, Button } from "@mui/material";
import "./Login.css";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [name, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addres, setAddres] = useState("");
  const [perfilname, setPerfilName] = useState("");
  const [perfilavatar, setPerfilAvatar] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Un problema ha ocurrido, inténtelo más tarde.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "user/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        lastname,
        username: email,
        password,
        addres,
        perfilname,
        perfilavatar,
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Por favor complete todos los campos!");
          } else if (response.status === 401) {
            setError("Error al completar los datos.");
          } else if (response.status === 500) {
            console.log(response);
            const data = await response.json();
            if (data.message) setError(data.message || genericErrorMessage);
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
    <>
      {error && (
        <h2 className="error-register" intent="danger">
          {error}
        </h2>
      )}

      <form onSubmit={formSubmitHandler} className="form-login">
        <form labelFor="firstName" className="forms-login">
          <h2>¡Hola! Para seguir, ingresá los siguientes datos.</h2>
          <input
            id="firstName"
            label="Nombre"
            className="textfield"
            onChange={(e) => setFirstName(e.target.value)}
            value={name}
            placeholder="Nombre"
          />
        </form>
        <form labelFor="firstName" className="forms-login">
          <input
            id="lastName"
            label="Apellido"
            className="textfield"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellido"
            value={lastname}
          />
        </form>
        <form labelFor="email" className="forms-login">
          <input
            id="email-register"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="textfield"
            placeholder="Email"
          />
        </form>
        <form labelFor="password" className="forms-login">
          <input
            id="password-register"
            label="Contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="textfield"
            placeholder="Contraseña"
          />
        </form>
        <form labelFor="addres" className="forms-login">
          <input
            id="addres"
            label="Domicilio"
            className="textfield"
            onChange={(e) => setAddres(e.target.value)}
            value={addres}
            placeholder="Domicilio"
          />
        </form>
        <form labelFor="perfil" className="forms-login">
          <input
            id="perfilName"
            className="textfield"
            onChange={(e) => setPerfilName(e.target.value)}
            value={perfilname}
            placeholder="Perfil Name"
          />
        </form>
        <form labelFor="perfil" className="forms-login">
          <input
            id="perfilAvatar"
            className="textfield"
            onChange={(e) => setPerfilAvatar(e.target.value)}
            value={perfilavatar}
            placeholder="Perfil Avatar"
          />
        </form>
        <Button
          disabled={isSubmitting}
          text={`${isSubmitting ? "Registering" : "Register"}`}
          variant="contained"
          type="submit"
          className="btn-login"
        >
          Crear Cuenta
        </Button>
        <div className="form-footer">
          <p>¿Necesitas ayuda?</p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
