import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../login/UserContext";
import "./Navigation.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ms-4 navbar-display">
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
         {/* <li className="nav-item">
            <NavLink className="nav-link" to={`/products/${currentUser.username}/saved`}>
              Saved
            </NavLink>
          </li>
    */}
          <li className="nav-item">
            <NavLink className="nav-link" to={`/products/cart`}>
              Cart
            </NavLink>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
          
        </ul>
    );
  }
  function loggedInNavAdmin() {
    return (
        <ul className="navbar-nav ms-4 navbar-display">
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to={`/products/admin`}>
              Admin
            </NavLink>
            </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`/products/${currentUser.username}/saved`}>
              Saved
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" to={`/products/cart`}>
              Cart
            </NavLink>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
          
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md navbar-display">
        <Link className="navbar-brand ms-2" to="/">
          Lipsticks
        </Link>
        {currentUser ? currentUser.isAdmin ? loggedInNavAdmin() : loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default NavBar;