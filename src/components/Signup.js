import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import securelogin from '../svgs/Authentication.svg';

const Signup = (props) => {
    const [credentials, setCredentials]= useState({name:"",email:"", password:"",cpassword:""});
    let history = useHistory();//to redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem("token", json.authtoken);
            history.push("/")
            props.showAlert("Account Created Successfully","success")

        }else{
           props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    } 

    return (
        <section className='flex my-2'>
            <div className="container  mt-3 " style={{ border: '.5px solid #e5e5e5', boxShadow: '2px  0px 8px 0px #e5e5e5' }}>
                <div className="row px-2 mt-4">
                    <div className='col-md-7 col-12'>
                        <div className="register-form mb-4  px-3">
                            <h2 className='mb-4 '>Sign Up</h2>
                            <form className='register-form' id='register-form' onSubmit={handleSubmit}>
                                <div className=" form-group mb-3 ">
                                    <label htmlFor="name" className="form-label"> Name</label>
                                    <input type="text" className="form-control" id="name"  name="name"  onChange={onChange} aria-describedby="name" placeholder='Enter Full Name' />
                                </div>
                                <div className=" form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email"  name="email"  onChange={onChange}  minLength={6} required aria-describedby="email" placeholder='Enter Email' />
                                </div>
                                <div className=" form-group mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"  name="password" onChange={onChange}  minLength={6} required  placeholder='Enter Password' />
                                </div>
                                <div className=" form-group mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="cpassword"  name="cpassword"  onChange={onChange} placeholder='Renter Password' />
                                </div>
                                <button className="btn btn-dark  btn-md " to="/signup" role="button"  type='submit' style={{backgroundColor: "#2c3e50",width:"46vw"}}>Sign Up</button>
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

export default Signup
