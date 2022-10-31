import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../Firebase/firebase.init';
import './Home.css'
const AddBlog = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageKey='4295ac4d47b569312bea67b440cdbdbb';
    if(loading){
        return <h2>Loading ...</h2>
    }

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(result =>{
            if(result.success){
                const img = result.data.url;
                console.log(img,data)
                const blog ={
                    name:data.name,
                    title:data.title,
                    category:data.category,
                    email:data.email,
                    text:data.text,
                    img:img

                }
                console.log(blog)
                fetch('http://localhost:5000/api/post/', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(blog)
                })
                .then(res =>{
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(inserted =>{
                    if(inserted){
                        toast.success('Blog added successfully')
                        reset();
                    }
                    else{
                        toast.error('Failed to add the Blog');
                    }
                })
            }
        })
    }
    return (
        <div class=" LoginForm container">
<h1 class="form-heading">login Form</h1>
<div class="login-form">
<div class="main-div">
    <div class="panel">
   <h2>Admin Login</h2>
   <p>Please enter your email and password</p>
   </div>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div class="form-group">

<input type="text" class="form-control" id="inputPassword" placeholder="Name"

{...register("name", {
    required: {
        value: true,
        message: 'Name is Required'
    }
})}

/>
<label className="label">
{errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
</label>

</div>
    <div class="form-group">

<input type="text" class="form-control" id="inputPassword" placeholder="Title"

{...register("title", {
    required: {
        value: true,
        message: 'Title is Required'
    }
})}

/>
<label className="label">
{errors.title?.type === 'required' && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
</label>

</div>

    <div class="form-group">

<input type="text" class="form-control" id="inputPassword" placeholder="Category"


{...register("category", {
    required: {
        value: true,
        message: 'Category is Required'
    }
})}


/>

<label className="label">
{errors.category?.type === 'required' && <span className="label-text-alt text-red-500">{errors.category.message}</span>}
</label>

</div>

        <div class="form-group">


            <input value={user.email} type="email" class="form-control" id="inputEmail" placeholder="Email Address"
            
            {...register("email", {
                required: {
                    value: true,
                    message: 'Email is Required'
                }
            })}
            
            />
            <label className="label">
{errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
</label>

        </div>

       
        <div class="form-group">

           <textarea type="text" class="form-control text__area" id="inputPassword" placeholder='Text'
            {...register("text", {
                required: {
                    value: true,
                    message: 'Text is Required'
                }
            })}
           
           />
            <label className="label">
{errors.text?.type === 'required' && <span className="label-text-alt text-red-500">{errors.text.message}</span>}
</label>

        </div>


<div className="form-control">
                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


        <input className='btn btn btn-primary sub__btn ' type="submit" value="Add" />

    </form>
    </div>

</div>
</div>


    );
};

export default AddBlog;