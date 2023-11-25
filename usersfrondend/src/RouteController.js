import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function RouteController(props) {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/login');
          }
          
       },[])

    const Page= props.page;
  return (
    <div><Page/></div>
  )
}

export default RouteController