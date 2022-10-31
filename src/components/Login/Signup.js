import React from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../Firebase/firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import '../Home/Home.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';
const Signup = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
] = useCreateUserWithEmailAndPassword(auth);
const [token] =useToken(user)
if(user){
  toast(`Login Sussesfull`)
}
if(error){
  toast.error(error.message)
}
if(loading){
  return <h1>Loading...</h1>
}
  const onSubmit = async(data) => {
    await createUserWithEmailAndPassword(data.mail, data.password);
    console.log(data)
  };
    return (
        <div>
            <div class="container pt-4">
    <div class="col-md-6">
    <div id="logbox">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>create an account</h1>
        <input  type="text" placeholder="What's your username?"  autofocus="autofocus"  class="input pass"
         {...register("Name", { required: true })} 
         aria-invalid={errors.Name ? "true" : "false"} 
        />
        <p className='text-danger text-center'>{errors.Name?.message}</p>
        <input  type="email" placeholder="Email address" class="input pass"
        {...register("mail", { required: "Email Address is required" })} 
        aria-invalid={errors.mail ? "true" : "false"} 
        
        />
         <p className='text-danger text-center'>{errors.mail?.message}</p>
        <input type="password" placeholder="Choose a password"  class="input pass"
        {...register("password", {
          required: {
              value: true,
              message: 'Password is Required'
          },
          minLength: {
              value: 6,
              message: 'Must be 6 characters or longer'
          }
      })}
        />
         <p className='text-danger text-center'>{errors.password?.message}</p>
        <input type="submit" value="Sign me up!" class="inputButton"/>
        <div class="text-center">
            already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
   </div>
        </div>
        </div>
    );
};

export default Signup;