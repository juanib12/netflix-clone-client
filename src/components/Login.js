import AccountBox from "@mui/icons-material/AccountBox";
import PersonAddAlt from "@mui/icons-material/PersonAddAlt";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Login.css";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "./UserContext";
import "./Login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import App from "../App.js";
import Loader from "./Loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Login() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  console.log(userContext);

  return userContext.token === null ? (
    <div>
      <div className="sombra-img">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/e690a920-9a22-4d39-8db2-545a95a0f460/AR-es-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg" width={1519} height={1200}/>
      </div>
      <div className="container-login">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          className="tabs-login"
          textColor="white"
        >
          <Tab icon={<AccountBox />} label="INICIAR SESIÓN" {...a11yProps(0)} />
          <Tab icon={<PersonAddAlt />} label="CREAR CUENTA" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterForm />
        </TabPanel>
      </div>
    </div>
  ) : !userContext.token ? (
    <Loader />
  ) : (
    <App />
  );
}
