import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../login/UserContext";


function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;