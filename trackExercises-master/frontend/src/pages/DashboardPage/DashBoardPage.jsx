// import React, { useState } from 'react';
import { Component } from 'react';
import { Card,Button,ListGroup,Image} from 'react-bootstrap';
import {  } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Nav from '../../NavLink/navlink';
import '../../NavLink/nav.css'
import { Link } from 'react-router-dom';
import NavbarComponent from '../../Navbar/NavbarComponent';


// import { Link } from 'react-router-dom';
// import '../DashboardPage/Dashboard.css';

 // pass user details
  class DashboardPage extends Component{
    constructor(props){
      super(props);
      this.state={
        userData: "",
      };
    }
         componentDidMount(){
                     fetch('http://localhost:5000/userData',{
                      method: "POST",
                      crossDomain: true,
                      headers:{
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: JSON.stringify({
                        token: window.localStorage.getItem("token"),
                        // 
                        // {isLoggedIn==="true"? <DashBoardPage />:<Home />} 
                      }),
                     })
                     .then((res)=> res.json())
                     .then((data)=>{
                      console.log(data,"userData")
                          this.setState({userData: data.data});
                          // if data token is expired then alert show 
                          if(data.data==='Token expired'){
                            // alert("Session expired login agin! ")
                            console.log("expired your")
                            window.localStorage.clear();
                            window.location.replace ("/login");
                          }
                       
                     })
         }

     

 render(){
    return (
      <>
      


      <NavbarComponent/>

<div className='d-flex justify-content-center align-items-center my-5'>
      
    <Card style={{width: '45em', }}  className='bg-dark ' id='cardColor'>
       <Nav/>
       
    <div className="d-flex justify-content-center align-items-center my-5  customCard">
  
      <Card style={{width: '20em'}} id='cardColor'>

        <Card.Body>
        <Card.Title className='text-center '>Welcome {this.state.userData.fname}  
           </Card.Title>
           <div className='justify-content-center algin-item-center text-center'>
<Image  style={{width:'38px'}} src="https://user-images.githubusercontent.com/35910158/35493994-36e2c50e-04d9-11e8-8b38-890caea01850.png" roundedCircle /> 
</div>
      <Card.Img variant="top" src="" />
      <Card.Body>
      <span   > <Card.Title> 
      {this.state.userData.fname} {this.state.userData.lname}  
       {/* <Image className='  mx-4'  style={{width:'28px'}} src="https://cdn-icons-png.flaticon.com/512/2561/2561999.png" roundedCircle />     */}
           </Card.Title></span>
        {/* <Card.Text>
       
        </Card.Text> */}
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item> </ListGroup.Item>

        <ListGroup.Item> {this.state.userData.email}</ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
      </ListGroup>
      <Card.Body>
       <div className='d-flex justify-content-center align-items-center'>
     <Link to={'/editUser'}>  <Button className='mx-3' variant="success">Create User</Button></Link>   
     
        </div>
   
    
      </Card.Body>
  


         
        </Card.Body>
      </Card>
   
</div>
</Card>
</div>
    </>
  );
}
  }
export default DashboardPage;