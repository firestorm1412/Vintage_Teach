// user context
import React, { useState, createContext, useEffect } from "react";

function getUserFromLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll',()=>{})
  }, []);

  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };

  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "success",
  });
  const showAlert = ({ msg, type = "success" }) => {
    setAlert({ show: true, msg, type });
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <UserContext.Provider
      value={{ user, alert, userLogin, userLogout, showAlert, hideAlert }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
