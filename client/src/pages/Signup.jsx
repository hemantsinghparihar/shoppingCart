import React,{useEffect} from 'react';
import { useForm } from 'react-hook-form';
import authServices from '../services/authApi';
import { toast } from 'react-toastify';
import { useNavigate,Navigate} from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if user is already logged in
      const user = localStorage.getItem('user');
      if (user) {
        // Redirect to dashboard if user is logged in
        navigate('/dashboard', { replace: true });
      }
    }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formDataSubmit = (data) => {
    console.log('✌️data --->', data);

    authServices.loginUser(data).then((res) => {
      if (res === null) {
        console.log('user not found');
        console.log(localStorage.getItem('user'))
        // Show error toast
        toast.error('User not found. Please check your credentials.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        console.log('you are logged in');
        localStorage.setItem('user', JSON.stringify(res));
       // Redirect to the dashboard and replace the login page in history
       navigate('/dashboard', { replace: true });
      
      }
    });
  };

  return (
    <section className='vh-100' style={{ backgroundColor: '#eee' }}>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='card text-black' style={{ borderRadius: '25px' }}>
            <div className='card-body p-md-5'>
              <div className='row justify-content-center'>
                <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign In</p>

                  <form className='mx-1 mx-md-4' onSubmit={handleSubmit(formDataSubmit)}>
                    <div className='d-flex flex-row align-items-center mb-4 mt-4'>
                      <i className='ri-user-fill fs-4 me-1'></i>
                      <div className='flex-fill mb-0'>
                        <input
                          type='text'
                          id='username'
                          className='form-control'
                          name='username'
                          placeholder='Your Name'
                          {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && (
                          <span style={{ color: 'red', fontSize: '14px' }}>
                            {errors.username.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='d-flex flex-row align-items-center mb-4'>
                      <i className='ri-key-2-fill fs-4 me-1'></i>
                      <div className='form-outline flex-fill mb-0'>
                        <input
                          type='password'
                          id='password'
                          className='form-control'
                          name='password'
                          placeholder='Your Password'
                          {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && (
                          <span style={{ color: 'red', fontSize: '14px' }}>
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                      <button type='submit' className='btn btn-primary btn-lg'>
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>

                <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                    className='img-fluid' // Ensures image scales without losing quality
                    alt='Sample image'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;










// import React, { useState,useEffect } from 'react'
// import {useForm} from 'react-hook-form'
// import authServices from '../services/authApi'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//     const navigate=useNavigate()

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//       } = useForm()
    
//       const formDataSubmit=(data)=>{
//         console.log('✌️data --->', data);

//         authServices.loginUser(data).then((res)=>{
//             if (res === null) {
//                 console.log('user not found');
//                 // Show error toast
//                 toast.error('User not found. Please check your credentials.', {
//                     position: 'top-right',
//                     autoClose: 3000,
//                   });
//             }
//             else{
//                 console.log('you are logged in')
//                 localStorage.setItem('user', JSON.stringify(res));
//                 navigate('/categories')
//             }
            
//         })

//     }
//   return (
//     <section className='vh-100 ' style={{backgroundColor:'#eee'}}>
//         <div className='container h-100 '>
//             <div className="row d-flex justify-content-center align-items-center h-100 ">
//             <div className="card text-black" style={{ borderRadius: '25px' }}>
//                 <div className="card-body p-md-5 "> 
//                    <div className='row justify-content-center '>
//                         <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
//                             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

//                             <form className="mx-1 mx-md-4  "
//                              onSubmit={handleSubmit(formDataSubmit)}>
//                             <div className="d-flex flex-row align-items-center mb-4 mt-4">
//                                 <i class="ri-user-fill fs-4 me-1"></i>
//                                 <div className=" flex-fill mb-0">
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     className="form-control"
//                                     name="username"
//                                     placeholder='Your Name'
//                                     {...register('password', { required: 'Password is required' })}
                                    
//                                 />
//                                  {errors.username && (
//                                     <span style={{ color: 'red', fontSize: '14px' }}>
//                                         {errors.username.message}
//                                     </span>
//                                 )}
                                
//                                 </div>
//                             </div>

//                             <div className="d-flex flex-row align-items-center mb-4">
//                                 <i class="ri-key-2-fill fs-4 me-1"></i>
//                                 <div className="form-outline flex-fill mb-0">
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     className="form-control"
//                                     name="password"
//                                     placeholder='Your Password'
//                                     {...register('password', { required: 'Password is required' })}
                                    
//                                 />
                                
//                                 </div>
//                             </div>

//                             {/* <div className="d-flex flex-row align-items-center mb-4">
//                             <i class="ri-mail-fill fs-4 me-1"></i>
//                                 <div className="form-outline flex-fill mb-0">
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="form-control"
//                                     name="email"
//                                     placeholder='Your E-mail'
//                                     {...register("email", { required: true })}
                                    
//                                 />
                                
//                                 </div>
//                             </div> */}

//                             <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                                 <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
//                             </div>

//                             </form>
//                         </div>

//                         <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//                             <img
//                             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                             className="img-fluid" /* Ensures image scales without losing quality */
//                             alt="Sample image"
//                             />
//                         </div>
                    
//                    </div>
                    
//                 </div>
                    
//             </div>
//             </div>
//         </div>
     
//     </section>
//   )
// }

// export default Signup
