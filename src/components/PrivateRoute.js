import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

export default function PrivateRoute({ children }) {
  const { user } = React.useContext(UserContext);

  return (
    <Route
      render={() => {
        return user.token ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );

  return <h1>hello from private route</h1>;
}
