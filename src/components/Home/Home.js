import React from 'react';
import Navbar from './Navbar';
import './Home.css'
import Hero from './Hero';
import Main from './Main';
import Newsleter from './Newsleter';
import Footer from './Footer';
const Home = () => {
    return (
        <div>
            
           <Main></Main>
           <Newsleter></Newsleter>
           <Footer></Footer>
        </div>
    );
};

export default Home;