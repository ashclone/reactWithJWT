import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from './Header';


function Login() {
  const initData = {
    username: "",
    password: "",
  };
  const [loginForm, setloginForm] = useState(initData);
  const [loginFormError, setloginFormError] = useState(initData);
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setloginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const loginClick=()=>{
   //alert(loginForm.username)
   let hasError = false;
   let messages = initData;
   if(loginForm.username.trim().length == 0)
   {
    hasError = true;
    messages={...messages,username:"UserName Empty!!!!"};
   }
   if(loginForm.password.trim().length==0)
   {
    hasError=true;
    messages={...messages,password:"Password Empty!!!!"};
   }
   if(hasError)setloginFormError(messages);
   else
   {
      axios.post("http://localhost:8082/login",loginForm).then((d)=>{
        if(d.data.status==1){
          localStorage.setItem("currentUser",d.data.data);
          navigate("/home");
        }
        else{
          alert(d.data.message);
          setloginForm(initData);
        }
      }).catch((e)=>{
        alert(JSON.stringify(e));
        setloginForm(initData);
      });
   }
  };
  return (
    <div>
       <Header/>
      <div class="row">
        <div class="card text-center mx-auto m-2">
          <div class="card-header bg-primary text-white">
            Login
          </div>
          <div class="card-body">
            <div className='form-group row'>
              <div className='col-4'>
                <label for="txtuname">UserName</label>
              </div>
              <div className='col-8'>
                <input type="text" onChange={changeHandler} className="form-control" placeholder='Enter UserName' name="username" id="txtuname" />
                <p className='text-danger'>{loginFormError.username}</p>
              </div>
            </div>
            <div className='form-group row'>
              <div className='col-4'>
                <label for="txtpassword">Password</label>
              </div>
              <div className='col-8'>
                <input type="password" onChange={changeHandler} className="form-control" placeholder='Enter Password' name="password" id="txtpassword" />
                <p className='text-danger'>{loginFormError.password}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <div>
              <button onClick={loginClick} className='btn btn-info m-1'>Login</button></div>
            <Link to="/register">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login