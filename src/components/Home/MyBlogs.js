import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase/firebase.init';

const MyBlogs = () => {
    const [user, loading] = useAuthState(auth);
    const { data, isLoading, refetch } = useQuery('userPost', () => fetch(`http://localhost:5000/api/post/blog/me?user=${user.email}`, {
        method: 'GET',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if(isLoading){
        return <h1>Loading ...</h1>
    }
    const truncate = (str) =>{
        const sliceText =str.slice(0,150)
        return `${sliceText}...`
    }
    // const navigate = useNavigate();
    const handleNavigate = (id) =>{
        console.log(id)
    }
    console.log(data)
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <div className=' mt-5 pb-5 blogs__container'>
           {
            data.map(items =>{
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

export default MyBlogs;