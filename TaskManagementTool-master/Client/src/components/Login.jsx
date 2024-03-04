import React, { useContext, useState } from "react";
import axios from "axios";
import Home from "./Home";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { MyUserContext } from "../Context/MyUserContext";


function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Get the navigate function for navigation
  const { currentUser, setUserName} = useContext(MyUserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("/api/auth/login", user)
      .then((response) => {
        // Handle successful login (e.g., store JWT token)
        // alert("Login successful");
        //   toast.success('Login Successfully!', {
        //     position: toast.POSITION.TOP_RIGHT
        // });
        toast.success("Log In Suceesfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
     
        // Store the JWT token in a cookie
        setUserName(response.data.username);
        Cookies.set("token", response.data.token);

        // Redirect to the task list or other pages after successful login
        navigate(`/tasklist`);
      })
      .catch((error) => {
        // Handle login error (e.g., display error message)
        // alert(error.response.data.message);
        console.log(error);
        // console.error("Login failed:", error.response.data.message);
      });
  };

  return (
    <>
      <Home />
      <div className="container mt-5 lg-w-25 p-5 rounded-2 shadow-lg">
        <h1 className="text-center text-success">Login</h1>
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
            className="btn btn-outline-success w-100 fw-bolder"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
