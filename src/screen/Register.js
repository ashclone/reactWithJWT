import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';


function Register() {
  const initData={
   username:"",
   password:"",
   confirmpassword:"",
};

const [registerForm,setRegisterForm]=useState(initData);
const [registerFormError,setregisterFormError]=useState(initData);
const navigate = useNavigate();

const changeHandler = (event) => {
  setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
};

const registerClick=()=>{
   //alert(registerForm.username);
   let hasError=false;
   let messages=initData;
   if(registerForm.username.trim().length==0)
   {
    hasError=true;
    messages={...messages,username:"UserName Empty!!!"};
   }
   if(registerForm.password.trim().length==0)
   {
    hasError=true;
    messages={...messages,password:"Password Empty!!!"};
   }
   else if(registerForm.password.trim().length>=20 || registerForm.password.trim().length<=6)
    {
     hasError=true;
     messages={...messages,password:"Range is 6 to 20"};
    }
 
   if(registerForm.confirmpassword.trim().length==0)
   {
    hasError=true;
    messages={...messages,confirmpassword:"ConfirmPassword Empty!!!"};
   }
   if(registerForm.password!=registerForm.confirmpassword)
   {
    hasError=true;
    messages={...messages,confirmpassword:"Password & ConfirmPassword Must Be Same"};
   }
  
  //  if(registerForm.password.length>20 || registerForm.password.length<6)
  //  {
  //   hasError=true;
  //   messages={...messages,password:"Range is 6 to 20"};
  //  }
   if(hasError)setregisterFormError(messages);
   else{
    axios.post("http://localhost:8082/register",registerForm).then((d)=>{
      if(d.data.status==1)
      {
        alert(d.data.message);
        navigate("/login");
      }
      else{
        alert(d.data.message);
        setRegisterForm(initData);
      }
    }).catch((e)=>{
      alert(JSON.stringify(e));
      setRegisterForm(initData);
    });
   }
};
  
  return (
    <div>
       <Header/>
      <div class="row">
        <div class="card text-center mx-auto m-2">
          <div class="card-header bg-primary text-white">
            SignIn
          </div>
          <div class="card-body">
            <div className='form-group row'>
              <div className='col-4'>
                <label for="txtuname">UserName</label>
              </div>
              <div className='col-8'>
                <input type="text" className="form-control" placeholder='Enter UserName' name="username" id="txtuname" onChange={changeHandler} />
                <p className='text-danger'>{registerFormError.username}</p>
              </div>
            </div>
            <div className='form-group row'>
              <div className='col-4'>
                <label for="txtpassword">Password</label>
              </div>
              <div className='col-8'>
                <input type="password" className="form-control" placeholder='Enter Password' name="password" id="txtpassword" onChange={changeHandler} />
                <p className='text-danger'>{registerFormError.password}</p>

              </div>
            </div>
            <div className='form-group row'>
              <div className='col-4'>
                <label for="txtcpassword">ConfirmPassword</label>
              </div>
              <div className='col-8'>
                <input type="password" className="form-control" placeholder='Enter Confirm Password' name="confirmpassword" id="txtcpassword" onChange={changeHandler} />
                <p className='text-danger'>{registerFormError.confirmpassword}</p>

              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <div>
              <button  onClick={registerClick} className='btn btn-info m-1'>Register</button></div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Register