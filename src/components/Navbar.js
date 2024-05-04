
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Mycart from '../pages/Mycart';
import { useCart } from '../context/FoodContext';

const Navbar = () => {
    let user = useCart();
    const navigate = useNavigate();
    // const [view, setView] = useState(false)

    const handlemycart=()=>{
        navigate('/cart')
    }
    const handlLog = () => {
        localStorage.removeItem("auth");
        navigate('/login');
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid " >
                    <Link className="navbar-brand fs-1 fst-italic" to="/">FooDies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item" >
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {/* {
                                (localStorage.getItem("auth")) ?
                                    <li className="nav-item" >
                                        <Link className="nav-link  fs-5" aria-current="page" to="/">My-Orders</Link>
                                    </li>
                                    :
                                    ""
                            } */}
                        </ul>
                        {(!localStorage.getItem("auth")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">SignIn</Link>

                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </div>
                            :
                            ""
                        }

                        <div className='btn bg-white text-success mx-2' onClick={handlemycart}>
                            MyCart {" "}
                            <Badge pill bg="danger">{user.length}</Badge>
                        </div>
                        {/* {
                            view ? <Modal onclose={() => setView(false)}><Mycart /></Modal> : null
                        } */}
                        {
                            (localStorage.getItem("auth")) ?

                                <div className='btn bg-white text-danger mx-2' onClick={handlLog}>Logout</div>
                                :
                                ""
                        }



                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;
