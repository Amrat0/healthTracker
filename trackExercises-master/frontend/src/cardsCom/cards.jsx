import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import card1 from '../Images/card1.jpeg'
import card2 from '../Images/card2.jpeg'
import card3 from '../Images/card3.jpeg'


function CardsCom() {
  return (
    <div className='d-flex justify-content-center'>
    <div className='row' >
       <div className='col mx-1 my-5  ' >
    <Card  style={{ width: '18rem', boxShadow: '-1px 1px 10px 0px  purple', }}>
      <Card.Img variant="top" src={card3} />
      <Card.Body>
        <Card.Title>Swimming</Card.Title>
        <Card.Text>
        If you're simply swimming laps, you'll gain more upper or lower body strength by dividing your workout.        </Card.Text>
     
      <Link to={'/login'}>
      <Button  variant="success">Track</Button>
      </Link>
      </Card.Body>
    </Card>
    </div>
    <div className='col mx-1 my-5' >
    <Card  style={{ width: '18rem' , boxShadow: '-1px 1px 10px 0px  purple',}}>
      <Card.Img variant="top" src={card2}/>
      <Card.Body>
        <Card.Title>Cycling</Card.Title>
        <Card.Text>
        Cycling improves overall function in your lower body and strengthens your leg muscles without overstressing.</Card.Text>
    
      <Link to={'/login'}>
      <Button  variant="success">Track</Button>
      </Link>
      </Card.Body>
    </Card>
    </div>
    <div className='col mx-1 my-5' >
    <Card  style={{ width: '18rem', boxShadow: '-1px 1px 10px 0px  purple', }}>
      <Card.Img variant="top" src={card1} />
      <Card.Body>
        <Card.Title>Running</Card.Title>
        <Card.Text>
        Running is a popular form of exercise. It doesn’t need much equipment, and you can do it just about anywhere or anytime.        </Card.Text>
    
        <Link to={'/login'}>
      <Button  variant="success">Track</Button>
      </Link>
      </Card.Body>
    </Card>
    </div>
    </div>
    </div>
  );
}

export default CardsCom;