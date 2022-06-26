import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Inicio from "./Inicio";

const Login = () => {
  return (
    <div>
      <SignedIn>
        <Inicio />
      </SignedIn>
    </div>
  );
};

export default Login;
