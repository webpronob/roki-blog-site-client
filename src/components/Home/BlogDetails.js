import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../Firebase/firebase.init';
import Footer from './Footer';
import Hero from './Hero';
import './Home.css'
import Newsleter from './Newsleter';
const BlogDetails = () => {
    const params =useParams();
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery('post', () => fetch(`http://localhost:5000/api/post/${params.id}`, {
        method: 'GET',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
        }
        return res.json()
    }));
    console.log(data)
    if(isLoading){
        return <h1>Loading...</h1>
    }
    
    return (
        <div className='detail__container'>
            <Hero></Hero>
            <div>
            <div  className='blogDetail__container'>

<div className='img__section'>
<img src={data.img}
 alt="Girl in a jacket"/>
</div>

<div className='text__section'>
    <h1>{data.title}</h1>
    <h5>{`Posted By  ${data.userName} 2 Years Ago`}</h5>
    <p>{data.text}</p>
</div>

</div> 
            </div>
            <Newsleter></Newsleter>
            <Footer></Footer>
        </div>
    );
};

export default BlogDetails;