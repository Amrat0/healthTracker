import React from 'react';
import { Navbar, Nav, Container,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../Images/logos.png'

const NavbarComponent = () => {
  let Token = localStorage.getItem("token")
 const logOut=()=>{  
    window.localStorage.clear("token");
    window.localStorage.clear("loggedIn");
    window.location.replace("/")
 }
  return (
  <>
    <Navbar  bg="dark" variant="dark" style={{boxShadow: '0 3px 3px 0  gray',}}> 
        <Container >
          <Navbar.Brand as={Link} to="/"><Image  style={{ borderRadius: '10%', boxShadow: '-3px  3px 2px 2px  purple',backgroundColor:'white'}}   src={logo} width="80px" height="35px"></Image></Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {
              Token==null?
              <>
              <Nav.Link as={Link} to="/login" >Login</Nav.Link>
               <Nav.Link as={Link} to="/register" >Sign up</Nav.Link>
              </>:
              <Nav.Link as={Link} to="/" onClick={logOut}>Logout</Nav.Link>  

            }
            


            {/* <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  </>
    
  );
};

export default NavbarComponent;
