import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import introVideo from "../../assets/introvideo.gif";
import NavBar from "../../components/NavBar";

function Home() {
  return (
    <div className=" h-screen w-screen   bg-black">
      <NavBar />
      <div className=" h-5/6 flex justify-center items-center ">
        <div className="text-white flex  justify-center items-center flex-col gap-5">
          <Typography className="text-4xl">
            Event management software
          </Typography>
          <Link to="dashboard">
            <Button className="w-fit" variant="contained">
              View Events
            </Button>
          </Link>
        </div>
        <div className="w-2/5 ">
          <img src={introVideo} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
