import React from 'react';
import Blogs from './Blogs';
import Hero from './Hero';

const Main = () => {
    return (
        <div className='main__container'>
            <Hero></Hero>
            <Blogs></Blogs>
        </div>
    );
};

export default Main;