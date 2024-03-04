import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Home from './Home';

function Register() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Get the navigate function for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    axios
      .post('/api/auth/register', user)
      .then(() => {
        // Redirect to the task list after successful registration
        navigate('/login');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
        console.error('Registration failed:', error);
      });
  };

  return (
    <>
      <Home />
      <div className="container mt-5 lg-w-25 p-5 rounded-2 shadow-lg">
        <h1  className="text-center text-primary">Register</h1>
        <form className="d-flex flex-column justify-content-center align-items-center ">
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label fw-bolder">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label fw-bolder">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-primary w-100 fw-bolder" 
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
