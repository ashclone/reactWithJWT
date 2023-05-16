import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate= useNavigate();
  const [user,setUser]=useState(null);
  useEffect(()=>{
    let usr=localStorage.getItem("currentUser");
    if(usr){
      setUser(usr);
    }
  },[]);

  const LogOut=()=>{
    localStorage.removeItem("currentUser");
    navigate("/login");
  }
  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to="/home" className="nav-link">Home</Link>
      </li>
      <li class="nav-item">
        <Link to="/about" className="nav-link">About</Link>
      </li>
      <li class="nav-item">
        <Link to="/contact" className="nav-link">Contact</Link>
      </li>
      <li class="nav-item">
        <Link to="/employee" className="nav-link">Employee</Link>
      </li>
    </ul>
    {
      user?(
        <div/>
      ):(
        <Link to="/register" class="btn btn-outline-success m-1 my-2 my-sm-0">Register</Link>
      ) }
      {
        user?(
         <a onClick={LogOut} className="btn btn-outline-success my-2my-sm-o">LogOut</a>
        ):(
          <Link to="/login" class="btn btn-outline-success my-2 my-sm-0">Login</Link>
        )
      }
    {/* <form class="form-inline my-2 my-lg-0"> */}
    {/* </form> */}
  </div>
</nav>
    </div>
  );
}

export default Header;
