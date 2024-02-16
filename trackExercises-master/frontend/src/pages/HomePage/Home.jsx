import React from 'react'
// import { Button, Card } from "react-bootstrap";
import '../HomePage/Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from 'react-router-dom';
import NavbarComponent from '../../Navbar/NavbarComponent';
import CarouselSlider from '../../sliderCom/HomeSlider';
import CardsCom from '../../cardsCom/cards';


const Home = () => {
  return (
 <>
 <NavbarComponent pageName="Home"/>
 <CarouselSlider/>
 < CardsCom/>

 
 

    {/* <div className="d-flex justify-content-center align-items-center customCard">
      <Card style={{ width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
        <Card.Body>
          <h2>Track Your Exercise</h2>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Link to='/login'>
            <Button variant="success" className='mt-3'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant="success" className='ms-3 mt-3'>Sign Up</Button>
          </Link>
          <Link to='/track'>
            <Button variant="success" className='ms-3 mt-3'>Track</Button>
          </Link>
        </Card.Body>
      </Card>
    </div> */}
 </>
  )
}

export default Home
