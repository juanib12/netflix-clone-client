import {useCallback, useContext, useEffect, useState} from 'react'
import {UserContext} from './components/UserContext'
import Login from './components/Login'
import Inicio from './components/Inicio'
import Loader from './components/Loader'


function App() {
  const [userContext, setUserContext] = useContext(UserContext)

  //declaramos verifyUser con useCallback para evitar una nueva declaracion cuando el componente se vuelva a renderizar.
  const verifyUser = useCallback(() => {
    fetch("http://localhost:3001/user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
    }).then(async (response) => {
      //si devuelve una respuesta buena, guarda el token en el contexto.
      if(response.ok){
        const data = await response.json();
        setUserContext((oldValues) => {
          return {...oldValues, token: data.token}
        })
      } else{
        //si devuelve un error, establecemos el token en nulo en el contexto.
        setUserContext((oldValues) => {
          return {...oldValues, token: null}
        })
      }
      //llamamos a refreshToken cada 5 minutos para renovar el token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  //se llama a verifyuser al cargar la pagina.
  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  console.log(userContext);

  return userContext.token === null ? (
    <div>
      <Login />
    </div>
  ): userContext.token ? (
    <div>
      <Inicio />
    </div>
  ) : (
    <Loader />
  )
}

export default App;
