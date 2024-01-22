import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../login/UserContext";

function AdminPrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (!currentUser.isAdmin) {
    return <Navigate to="/products" />;
  }
  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default AdminPrivateRoute;