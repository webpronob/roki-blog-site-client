import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './Home.css'
const Blogs = () => {
    const [postData,setPostData] =useState([])
    
    
    useEffect(() =>{
        fetch('http://localhost:5000/api/post')
        .then(res =>res.json())
        .then(data =>setPostData(data))
    },[])
    const truncate = (str) =>{
        const sliceText =str.slice(0,150)
        return `${sliceText}...`
    }
    const navigate = useNavigate();
    const handleNavigate = (id) =>{
        navigate(`/blog/${id}`);
    }
    console.log(postData)
    return (
        <div className='d-flex align-items-center justify-content-center main__container'>
            <div className=' mt-5 pb-5 blogs__container'>
           {
            postData.map(items =>{
                return <div onClick={()=>handleNavigate(items._id)} className='blog__container'>

                <div className='img__section'>
                <img src={items.img}
                 alt="Girl in a jacket"/>
                </div>
                
                <div className='text__section'>
                    <h1>{items.title}</h1>
                    <h5>{`Posted By  ${items.userName} 2 Years Ago`}</h5>
                    <p>{truncate(items.text)}</p>
                </div>
                
                </div> 
            })
           }
        </div>
        </div>
    );
};

export default Blogs;


 