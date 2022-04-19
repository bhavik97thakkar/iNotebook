import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import securelogin from '../svgs/Authentication.svg';

const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""});
    let history = useHistory();
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credentials.email, password : credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Successfully Logged In","success")
            history.push("/");

        }else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    } 

    return (
        <section className='flex my-5'>
            <div className="container  mt-3 " style={{ border: '.5px solid #e5e5e5', boxShadow: '2px  0px 8px 0px #e5e5e5' }}>
                <div className="row px-2 mt-4">
                    <div className='col-md-7 col-12'>
                        <div className="register-form mb-4  px-3">
                            <h2 className='mb-4 my-3'>Sign In</h2>
                            <form className='login-form' id='login-form' onSubmit={handleSubmit}>
                                <div className=" form-group mb-3 my-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" value={credentials.email}  onChange={onChange} aria-describedby="email" placeholder='Enter Email' />

                                </div>
                                <div className=" form-group mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder='Enter Password' />
                                </div>
                                <button className="btn btn-dark  btn-md " to="/login"  role="button" style={{ backgroundColor: "#2c3e50", width: "46vw" }}>Login</button>
                            </form>
                        </div>
                    </div>

                    <div className="signupimage col-md-5  col-11 mt-4 px-5" style={{ display: 'flex', alignSelf: 'center' }}>
                        <figure >
                            <img src={securelogin} alt="registration image" style={{ width: '100%' }} />
                        </figure>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Login
