import React, { useState,useEffect } from "react";
import ImageSlider from "./components/ImageSlider";
import userprofile from '../src/images/user.jpg';
import Header from './components/Header'

function Home(){
    const [users, setUsers] = useState([]);
    const [orgUsers, setOrgUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selCategories, setSelCategories] = useState(0);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/userlist'); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setUsers(data.user); 
      setOrgUsers(data.user);
    } catch (error) {
      console.error('There was a problem fetching users:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categorieslist'); 
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setCategories(data.categories); 
    } catch (error) {
      console.error('There was a problem fetching users:', error);
    }
  };
  fetchCategories(); 
  fetchUsers(); 
}, []);

function handleCategoryChange(e){
    const selectedCategory = e.target.value;

    const filteredUsers = selectedCategory ?
        users.filter(user =>
        user.categories.some(category => category.category_id === parseInt(selectedCategory, 10))
      )
    : users; 
    setUsers(selectedCategory === "" ? orgUsers : filteredUsers);
   
}



    return(
< >
    <Header />
    <ImageSlider />
    <div className ="text-center my-5">
    <h4  >User Profiles</h4>
    
    <select onChange={handleCategoryChange} >
        <option value="">Select Category</option>
        {
         categories&&categories.map((item,index)=>{
          return   <option value={item.id}>{item.name}</option>
          })
        }
      </select>
    </div>
    

    <div className="container profileContainer my-5">
      <div className="row">
        {users.length === 0 ? (
          <div className="col-md-12">
            <p>No users found.</p>
          </div>
        ) : (
          users.map(user => (
            <div key={user.id} className="col-md-4">
              <div className="card my-3">
              {user.image === null ? (
            <img src={userprofile} alt="user" style={{ width: '100%', maxHeight: '250px'  }} />
          ) : (
            <img
              src={`http://localhost:8000/img/${user.image}`}
              alt="user"
              style={{ width: '100%' , maxHeight: '250px' }}
            />
          )}    
          
           <div className="profileContainer">
                  <h6 className="mt-1"><b>{user.name}</b></h6>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
    )
}
export default Home