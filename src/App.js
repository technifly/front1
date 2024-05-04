import React from 'react';
import Footer from './components/Footer';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.js';
import {FoodProvider} from './context/FoodContext.js';
import Navbar from './components/Navbar.js';
import Mycart from './pages/Mycart.js';


function App() {
  return (
    <>
      <FoodProvider>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='cart' element={<Mycart/>}/>
        </Routes>
      </FoodProvider>
    </>
  );
}

export default App;
