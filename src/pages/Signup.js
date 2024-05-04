
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });
    const handlesubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch("http://localhost:2001/user/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                location: data.location
            })
        })
        const info = await resp.json();
        console.log(info);

        if (!info.msg) {
            alert('enter valid credentials')
        }
    }

    const handlechange = (e) => {
        setData({ ...data , [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name </label>
                        <input type="text" className="form-control"  name='name' value={data.name} onChange={handlechange} />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input type="email" className="form-control"  name='email' value={data.email} onChange={handlechange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={data.password} onChange={handlechange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={data.location} onChange={handlechange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className="m-3 btn btn-danger">SignIn</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;
