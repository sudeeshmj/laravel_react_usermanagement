import React , { useState,useEffect } from "react";
import Header from "../components/Header";
import { useNavigate} from 'react-router-dom';
function Login(){
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [errors, setErrors] = useState({ email: '', password: '' });
     const [loginerrors, setLoginErrors] = useState("");
     useEffect(()=>{
      if(localStorage.getItem('user')){
        const user = localStorage.getItem('user');
        if(user.role === 1){
          navigate('/admin-dashboard');
        }else{
          navigate('/user-dashboard');
        }
        
      }
     },[])

     async function signIn(e){
      e.preventDefault();
      if (validateForm()) {
          let item = {email,password};
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
            
              setLoginErrors(errorResponse.error); 
            } else {
            
              setLoginErrors("Login failed for an unknown reason.");
            }
          }
        } 
  }

    function validateForm() {
        let valid = true;
        const updatedErrors = { email: '', password: '' };
    
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
      <> <Header />
        <div className="login d-flex justify-content-center align-items-center w-100 mt-5">
        <div className="shadow p-5 rounded bg-white" style={{ width: '40%'}}>
          <form onSubmit={signIn}>
          {loginerrors && <span className="text-danger">{loginerrors}</span>}
            <h3>Sign In</h3>
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
              <button className="btn btn-primary"type="submit" style={{ width: '100%' }}>Login</button>
            </div>
            <p className="text-center" >
              <a href="#" onClick={()=>{navigate('/forgot-password')}}>Forgot Password?</a>
            </p>
          </form>
        </div>
      </div>
      </>
    )
}
export default Login