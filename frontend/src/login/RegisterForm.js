import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";


function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
  
    async function handleSubmit(e) {
      e.preventDefault();
      let result = await signup(formData);
      if (result.success) {
        navigate("/");
      } else {
        setFormErrors(result.errors);
      }
    }
  
    function handleChange(e) {
      const { name, value } = e.target;
      setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="SignupForm">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 className="mb-3">Sign Up</h2>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                  </div>
  
                  <div className="form-group">
                    <label>First name</label>
                    <input
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                  </div>
  
                  {formErrors.length
                      ? <Alert type="danger" messages={formErrors} />
                      : null
                  }
  
                  <button
                      type="submit"
                      className="btn btn-secondary float-end mt-3"
                      onSubmit={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
  
  export default SignupForm;