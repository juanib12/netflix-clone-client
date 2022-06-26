import { useCallback, useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Loader from "./components/Loader";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";


function App() {
  

  return (
    <div>
      <SignedIn>
        <Inicio />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}

export default App;
