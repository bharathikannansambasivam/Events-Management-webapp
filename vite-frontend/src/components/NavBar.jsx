import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="pt-10 px-5 h-1/6 w-screen justify-between  flex ">
      <div className="text-white  text-3xl">
        <img src="" alt="" />
        EventFusion
      </div>

      <nav>
        {" "}
        <Link to="signin">
          {" "}
          <Button variant="contained">Sign In</Button>
        </Link>{" "}
        <Link to="signup">
          {" "}
          <Button variant="contained">Sign Up </Button>
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
