import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase/firebase.init';
import useToken from '../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] =useToken(user)
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if(user){
        toast(`Login Sussesfull`)
        navigate(from, { replace: true });
      }
      if(error){
        toast.error(error.message)
      }
      if(loading){
        return <h1>Loading...</h1>
      }
    const onSubmit = async(data) => {
        await signInWithEmailAndPassword(data.mail, data.password);
        console.log(data)
      };
    return (
        <div className='container'>
           <div class="col-md-6">
    <div id="logbox">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>account login</h1>
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
        <input type="submit" value="Sign me in!" class="inputButton"/>

        <div class="text-center">
            New Here <Link to="/signup">Signup</Link>
        </div>

      </form>
      </div>
      </div>
      </div>

    );
};

export default Login;