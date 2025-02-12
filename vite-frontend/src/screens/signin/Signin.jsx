import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Dot from "../../components/Dot";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bharathikannansambasivam-event.onrender.com/signin",
        {
          email,
          password,
        }
      );

      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div>
        <Typography className="text-3xl  p-5 absolute">
          <Link to="/">EventFusion</Link>
        </Typography>
      </div>{" "}
      <div className="w-screen flex justify-center items-center  h-screen ">
        <div className="   border-2 border-black rounded-xl  pb-16 px-10 flex flex-col justify-center w-1/3 items-center">
          <div>
            <Dot />
            <Typography className="text-3xl pb-5 ">Sign In</Typography>{" "}
            <div></div>
          </div>
          <form onSubmit={handleLogin} className="w-full flex gap-4 flex-col ">
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
            />
            <Button type="submit" variant="contained">
              Sign In
            </Button>

            <Typography>
              New user?{" "}
              <Link to="/signup" className="text-blue-700">
                Register here
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
