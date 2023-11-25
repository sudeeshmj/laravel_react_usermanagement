import React , { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { toast } from 'react-toastify';


function Register(){
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [name, setName] = useState('');
     const [errors, setErrors] = useState({ name: '',email: '', password: '' });
     const [regerrors, setRegErrors] = useState("");


     useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/user-dashboard');
      }
     },[])
    async function signUp(e){
        e.preventDefault();
        if (validateForm()) {
            let item = {name,email,password};
            let result = await fetch("http://localhost:8000/api/register",{
              method:"POST",
              body:JSON.stringify(item),
              headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
              }
            });
           
            if (result.ok) {
              const response = await result.json();
              const user = response.user;
              localStorage.setItem("user", JSON.stringify(user));
              toast.success("User Registered successfully");
              navigate('/user-dashboard');
            } else {
              const errorResponse = await result.json();
              if (errorResponse.errors && errorResponse.errors.email) {
              
                setRegErrors(errorResponse.errors.email[0]); 
              } else {
              
                setRegErrors("Registration failed for an unknown reason.");
              }
            }
          } 
    }

    function validateForm() {
        let valid = true;
        const updatedErrors = { name:'', email: '', password: '' };
        
        if (!name || !name.trim()) {
            updatedErrors.name = 'Name is required';
            valid = false;
          }

        if (!email || !email.trim()) {
          updatedErrors.email = 'Email is required';
          valid = false;
        }
    
        if (!password || !password.trim()) {
          updatedErrors.password = 'Password is required';
          valid = false;
        }
    
        setErrors(updatedErrors);
        return valid;
      }
    return(
      <>
      <Header />
        <div className="login d-flex justify-content-center align-items-center w-100 mt-5">
        <div className="shadow p-5 rounded bg-white" style={{ width: '40%'}}>
          <form onSubmit={signUp} >
          {regerrors && <span className="text-danger">{regerrors}</span>}
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Name</label>
              <input type="text" name="name" id="name" placeholder="Enter name" className="form-control" style={{ width: '100%' }}
                             value={name}
                             onChange={(e)=>{setName(e.target.value);}} />
            {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter email" className="form-control" style={{ width: '100%' }}
                             value={email}
                             onChange={(e)=>{setEmail(e.target.value);}} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter password"
                     className="form-control" style={{ width: '100%' }} 
                     value={password}
                     onChange={(e)=>{setPassword(e.target.value);}} />
             {errors.password && <div className="text-danger">{errors.password}</div>}
      
            </div>
            <div className="mb-3">
              <button className="btn btn-primary"type="submit" style={{ width: '100%' }}>Register</button>
            </div>
          </form>
        </div>
      </div>
      </>
    )
}
export default Register