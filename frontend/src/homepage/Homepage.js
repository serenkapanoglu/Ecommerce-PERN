import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../login/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentUser) {
       navigate("/products");
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [currentUser, navigate]);

  useEffect(() => {
    if (counter > 0) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [counter]);

  console.debug("Homepage", "currentUser=", currentUser);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Lipsticks</h1>
        <p className="lead">All lipsticks you looking for.</p>
        {currentUser ? (
          <>
            <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
            {counter > 0 && <p>Redirecting to best accessories in {counter} seconds...</p>}
          </>
        ) : (
          <p>
            <Link className="btn btn-secondary font-weight-bold m-3" to="/login">
              Log in
            </Link>
            <Link className="btn btn-secondary font-weight-bold" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;