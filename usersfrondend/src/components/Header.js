import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar,NavDropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Header(){
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
   function logout(){
        localStorage.clear();
        navigate('/');
   }
   const handleEditProfileClick = () => {
    navigate('/edit-profile');
  };

    return(
        <div>
              <Navbar bg="dark" data-bs-theme="dark">
                 <Container>
                    <Navbar.Brand >User Managment</Navbar.Brand>
                    {
                    user&&user.role===1 ?   //admin
                    <Nav className="navbar-item me-auto ms-5">
                        <NavDropdown title="User category">
                            <NavDropdown.Item  onClick={()=>{ navigate('/add-categories');}} >Add Category</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{ navigate('/set-categories');}} >Set Category</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :''
                    }


                    <Nav className="navbar-item">
                        {
                            localStorage.getItem('user')?
                            <> <Link to="/">Home</Link></>
                            :
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        }
                   
                       
                    </Nav>
            </Container>
            { localStorage.getItem('user') ?
            
              <Nav className="me-5">
                <NavDropdown title={user && user.name}>
              {user&&user.role===0 ?<NavDropdown.Item  onClick={handleEditProfileClick} >Edit Profile</NavDropdown.Item>:''}
                    <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
           :''
            }

      </Navbar>
        </div>
    )
}
export default Header