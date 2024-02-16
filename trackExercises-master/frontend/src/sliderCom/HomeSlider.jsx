import Carousel from 'react-bootstrap/Carousel';
import { Button,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import mainImg from '../Images/Header.jpg'
import fit from '../Images/fit.jpg'
import back from '../Images/back.jpg'
import s3 from '../Images/s3.jpeg'
import s4 from '../Images/s4.jpeg'



function CarouselSlider() {
  return (
    <Carousel className='my-1'>
      <Carousel.Item interval={2000}>
        <img style={{height: '95vh'}}
          className="d-block w-100 "
          src={back}
          alt="First slide"
        />
        <Carousel.Caption>
        <div className="d-flex align-items-start justify-content-start">
      <Card style={{boxShadow: '2px 2px 2px 2px  purple', width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
        <Card.Body>
          <h2 style={{color:'black'}}>Track Your Exercise</h2>
          <Card.Text style={{color:'black'}}>
            Holistic program combines cardio, strength training flexibility and mindfulness meditation.
          </Card.Text>
          <Link to='/login'>
            <Button variant="success" className='mt-3'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant="success" className='ms-3 mt-3'>Sign Up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="success" className='ms-3 mt-3'>Track</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img style={{height: '95vh'}}
          className="d-block w-100 "
          src={fit}
          alt="First slide"
        />
        <Carousel.Caption>
        <div className="d-flex align-items-start justify-content-start">
    
      <Card style={{boxShadow: '2px 2px 2px 2px  purple', width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
        <Card.Body>
          <h2 style={{color:'black'}}>Track Your Exercise</h2>
          <Card.Text style={{color:'black'}}>
            Holistic program combines cardio, strength training flexibility and mindfulness meditation.
          </Card.Text>
          <Link to='/login'>
            <Button variant="success" className='mt-3'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant="success" className='ms-3 mt-3'>Sign Up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="success" className='ms-3 mt-3'>Track</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  interval={2000} >
        <img style={{height: '95vh'}}
          className="d-block w-100"
          src={s4}
          alt="Second slide"
        />
        <Carousel.Caption>
        <div className="d-flex ">
      <Card style={{boxShadow: '2px 2px 2px 2px  purple', width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
        <Card.Body>
          <h2 style={{color:'black'}}>Track Your Exercise</h2>
          <Card.Text style={{color:'black'}}>
          Some program combines Brain, strength training flexibility and mindfulness meditation.

          </Card.Text>
          <Link to='/login'>
            <Button variant="success" className='mt-3'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant="success" className='ms-3 mt-3'>Sign Up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="success" className='ms-3 mt-3'>Track</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  interval={2000}>  
        <img style={{height: '95vh'}}
          className="d-block w-100"
             src={s3}
          alt="Third slide"
        />
        <Carousel.Caption>
        <div className="d-flex ">
      <Card  style={{   boxShadow: '2px 2px 2px 2px  purple', width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)' }} >
        <Card.Body>
          <h2 style={{color:'black'}}>Track Your Exercise</h2>
          <Card.Text style={{color:'black'}}>
          Law program combines cardio, strength training flexibility and mindfulness meditation.

          </Card.Text>
          <Link to='/login'>
            <Button variant="success" className='mt-3'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant="success" className='ms-3 mt-3'>Sign Up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="success" className='ms-3 mt-3'>Track</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselSlider;