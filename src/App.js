import {useCallback, useContext, useEffect, useState} from 'react'
import {UserContext} from './components/UserContext'
import Login from './components/Login'
import Inicio from './components/Inicio'


function App() {
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch("http://localhost:3001/user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
    }).then(async (response) => {
      if(response.ok){
        const data = await response.json();
        setUserContext((oldValues) => {
          return {...oldValues, token: data.token}
        })
      } else{
        setUserContext((oldValues) => {
          return {...oldValues, token: null}
        })
      }
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  console.log(userContext);

  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <div>
      <Login />
    </div>
  ): userContext.token ? (
    <div>
      <Inicio />
    </div>
  ) : (
    <div>
      Error
    </div>
  )
}

export default App;
