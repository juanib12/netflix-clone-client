import React, { useState } from "react";

//creamos un contexto. El valor es el valor predeterminado y defina la estructura de los datos que almacenamos en el contexto.

const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  const [state, setState] = useState(initialState);

  //nos sirve para acceder a los valors de contexto dentro de un componente.
  //debe envolverse dentro del provider de contexto. Al que podemos pasar los valores iniciales del contexto.
  return (
    //estamos pasando el valor de state a la funcion useState,
    // para que cuando consumimos el contexto, podemos usarlo como useState hook.
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
