import React, { useState } from 'react';
import './Home.css'

import { BiSearch } from 'react-icons/bi';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import { signOut } from 'firebase/auth';
const Navbar = () => {
    const [show,setShow]=useState(false)
    const [user, loading] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };
    console.log(show)
    return (
        <div className=''>
        <nav class="navbar px-4  navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    {/* <a class="" href="#">Navbar</a> */}
    <div  className='navbar-brandme-2'> <BiMenuAltLeft size={30}/>
          <span  className='ms-2'>Menu</span>
          </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
          <Link className='nav-link active' to="/">Home</Link>
        </li>
        <li class="nav-item">
          {/* <a class="nav-link" href="#">Link</a> */}
          <li><a class="nav-link" href='#'>Beauty</a></li>
        </li>

       
          {/* <a class="nav-link" href="#">Link</a> */}
         {
                    user ? <li className='nav-item'> <Link class="nav-link" to="/add_blog">Add Blog</Link></li>:""
                }
                 {
                    user ? <li className='nav-item'> <Link class="nav-link" to="/my_blog">MyBlogs</Link></li>:""
                }
        
        <li class="nav-item">
        <li className='mt-2'>{user ? <button className=" nav-link mb-3 btn btn-ghost mx-3" onClick={logout} >Sign Out</button> : <Link className='' to="/login">Login</Link>}</li>
        </li>

        <li class="nav-item"><a class="nav-link" href='#'>Travel</a></li>
        <li class="nav-item"><button className='menu__button'>Subscribe</button></li>
        
      </ul>
      {/* <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <div> 
            <span className='me-3'>Search</span>
            <BiSearch/>
          </div>
    </div>
  </div>
</nav>
        </div>
    );
};

export default Navbar;


