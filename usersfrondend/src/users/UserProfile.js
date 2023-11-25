import React , { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import userimg from '../images/user.jpg';
import { toast } from 'react-toastify';
function UserProfile() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [userData, setUserData] = useState({
          name: '',
          email: '',
          image: null,       
      });
     const [name, setName] = useState('');
     const [image, setImage] = useState(null);
     const [displayimage, setDisplayimage] = useState(userimg);
    
     const [errors, setErrors] = useState({ name: '',email: '', password: '' });
     const [updaterrors, setUpdateErrors] = useState("");
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/user-data/${userId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setUserData(data.user);
            setName(data.user.name);
            if(data.user.image === null){
                setDisplayimage(userimg);
                }
                else{
                    const img = 'http://localhost:8000/img/'+data.user.image;
                    setDisplayimage(img);}
          } catch (error) {
            toast.error("There was a problem with the fetch operation");
           
          }
        };
    
        if (userId) {
          fetchData();
        }
      }, [userId]);


   async function editUser(id){
        if (validateForm()) {
            const formData = new FormData();
            formData.append("name",name);
            formData.append("image",image);

            let result = await fetch("http://localhost:8000/api/updateuser/"+id,{
            method:"POST",
            body:formData, 
          });
          if (result.ok) {
            const response = await result.json();
            const user = response.user;
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("User profile updated successfully");
            navigate('/user-dashboard');
          } else {
                const errorResponse = await result.json();
                if (errorResponse.errors && errorResponse.error) {
                
                    setUpdateErrors(errorResponse.error); 
                } else {
                
                    setUpdateErrors("Update failed for an unknown reason.");
                }
          }


        }
    }


    function validateForm() {
        let valid = true;
        const updatedErrors = { name:''};
        
        if (!name || !name.trim()) {
            updatedErrors.name = 'Name is required';
            valid = false;
          }

        setErrors(updatedErrors);
        return valid;
      }
      function imageChange(e) {
        setImage(e.target.files[0]);
    }
   
  return (
    <>
    <Header />
      <div className="login d-flex justify-content-center align-items-center w-100 my-5">
      <div className="shadow p-5 rounded bg-white" style={{ width: '40%'}}>
        <form  onSubmit={e => e.preventDefault()}>
        {updaterrors && <span className="text-danger">{updaterrors}</span>}
         
          <div className="mb-3 d-flex  align-items-center">
            <img src={displayimage} alt="user" className="rounded-circle" style={{width:'70px',height:'70px'}} />
           <h3 className="ps-3">Edit Profile</h3>
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Name</label>
            <input type="text" name="name" id="name" placeholder="Enter name" className="form-control" style={{ width: '100%' }}
                          value={name}
                           onChange={(e)=>{setName(e.target.value);}} />
          {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" id="email" readOnly disabled placeholder="Enter email" className="form-control" style={{ width: '100%' }}
                           value={userData.email}
                          />
          </div>
       
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" name="image" id="image" 
                   className="form-control" style={{ width: '100%' }} 
                    onChange={imageChange} />
    
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={()=>{editUser(userData.id)}} style={{ width: '100%' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default UserProfile