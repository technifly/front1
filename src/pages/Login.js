
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
 const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:2001/user/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    const info = await resp.json();
    console.log(info);

    if (!info.msg) {
      alert('enter valid credentials')
    }

    if(info.msg){
      localStorage.setItem("auth", info.auth);
      localStorage.setItem("emailuser", data.email);
      console.log(localStorage.getItem("auth"));
      navigate('/');
    }
  }

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={data.email} onChange={handlechange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={data.password} onChange={handlechange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">login</button>
          <Link to='/signup' className="m-3 btn btn-danger">Signup</Link>
        </form>
      </div>
    </>
  )
}


export default Login;
