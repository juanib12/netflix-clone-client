import "./Header.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchMovie from "./SearchMovie";
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const {user} = useUser();

  console.log(user)

  return (
    <div>
      <div>
        <div className="center-perfiles">
          <h4>Movie App</h4>
          <div className="container-perfiles">
            <div></div>
            <div className="row-perfil">
              <UserButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
