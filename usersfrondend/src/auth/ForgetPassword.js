import React , { useState,useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
function ForgetPassword(){
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
     const [errors, setErrors] = useState({ email: '', password: '' });


     async function resetPassword(e){
      e.preventDefault();
      if (validateForm()) {
          let item = {email};
          let result = await fetch("http://localhost:8000/api/login",{
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
            if(user.role === 0){
              navigate('/user-dashboard');
            }else{
              navigate('/admin-dashboard');
            }
           
          } else {
            const errorResponse = await result.json();
            if ( errorResponse.error) {
            
             // setLoginErrors(errorResponse.error); 
            } else {
            
             // setLoginErrors("Login failed for an unknown reason.");
            }
          }
        } 
  }

    function validateForm() {
        let valid = true;
        const updatedErrors = { email: '' };
    
        if (!email || !email.trim()) {
          updatedErrors.email = 'Email is required';
          valid = false;
        }
    
        setErrors(updatedErrors);
        return valid;
      }
    return(
      <> <Header />
        <div className="login d-flex justify-content-center align-items-center w-100 mt-5">
        <div className="shadow p-5 rounded bg-white" style={{ width: '40%'}}>
          <form onSubmit={resetPassword}>
            <h3>Reset Password</h3>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter email" className="form-control" style={{ width: '100%' }}
                             value={email}
                             onChange={(e)=>{setEmail(e.target.value);}} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <button className="btn btn-primary"type="submit" style={{ width: '100%' }}>Reset</button>
            </div>
      
            
          </form>
        </div>
      </div>
      </>
    )
}
export default ForgetPassword