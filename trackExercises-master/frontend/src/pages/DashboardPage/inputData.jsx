import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../NavLink/nav.css";
import Nav from "../../NavLink/navlink";
import { Component } from "react";
import NavbarComponent from "../../Navbar/NavbarComponent";
import Swal from 'sweetalert2';


class Tracking extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      activity: "",
      duration: "",
      date: "",
      descriptionError: "",
      durationError: "",
      dateError: "",
      nameError:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    
    e.preventDefault();

    const { name, description, activity, duration, date } = this.state;

  
  

    const nameRegex= /^[a-zA-Z]+$/;
    if(!nameRegex.test(name)){
      this.setState({nameError: "Name only contain letters."})
      return;
    }

    if(name.length===0){
   this.setState({nameError: "Name is required"})
   return;
    }
else if(name.length>12){
  this.setState({nameError: "Maximum 12 character"})
  return ;
}
    const descriptionRegex =  /^[a-zA-Z]+$/;
    if(!descriptionRegex.test(description)){
      this.setState({descriptionError: "Description only contain letters."})
      return;
    }
    // Validate the description field
    else if (description.length === 0) {
      this.setState({ descriptionError: "Description is required" });
      return;
    } else if (description.length > 20) {
      this.setState({
        descriptionError: "maximum 20 characters ",
      });
      return;
    } else {
      this.setState({ descriptionError: "" });
    }

    // Validate the duration field
    if (duration <= 0) {
      this.setState({ durationError: "Greater than 0" });
      return;
    } else {
      this.setState({ durationError: "" });
    }

    // Validate the date field
    const currentDate = new Date().toISOString().split("T")[0];
    
  if (date < currentDate) {
    this.setState({ dateError: "Please choose a current or future date" });
    return;
  } else {
    this.setState({ dateError: "" });
  }

    // Other form submission logic...
    console.log(name, description, activity, duration, date );
    fetch("http://localhost:5000/noteTracker", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        description,
        activity,
        duration,
        date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Your Registered!");

        if (data.status === "Ok") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added Successfully',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              progress: 'swal-progress-color'
            }
          }).then(()=>{
      
              window.location.href = "/output";
            
          })
          //  window.localStorage.setItem("token",data.data);
        } else {
          // alert("Please fill out");
          console.log('fill out complete')
        }
      });
  }

  render() {
    const {
      description,
      descriptionError,
      date,
      duration,
      durationError,
      dateError,
      nameError,
    } = this.state;

    return (
      
      <>
        <NavbarComponent />

        <div className="d-flex justify-content-center align-items-center my-5">
          <Card className="bg-dark" style={{ width: "45em" }} id="cardColor">
            <Nav />
            <div className="d-flex justify-content-center align-items-center my-5">
              <Card style={{ width: "20em" }}>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        autoComplete="off"
                        required
                      />
                               {nameError && (
                        <Form.Label style={{color: 'red',fontSize:'13px'}} className="mx-1 my-1" >
                          {nameError}
                        </Form.Label>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                        autoComplete="off"
                      />
                      {descriptionError && (
                        <Form.Label style={{color: 'red',fontSize:'13px'}} className="mx-1 my-1" >
                          {descriptionError}
                        </Form.Label>
                      )}
                    </Form.Group>

                    <Form.Group>
                      <Form.Select
                        onChange={(e) =>
                          this.setState({ activity: e.target.value })
                        }
                        className="mb-3"
                        name="Activity"
                        
                      >
                        <option autoComplete="off" selected disabled hidden required> 
                          Select Activity
                        </option>
                        <option value="run">Running 🏃</option>
                        <option value="bicycle">Bicycle 🚲</option>
                        <option value="ride">Ride 🚴</option>
                        <option value="swim">Swim 🏊‍♀️</option>
                        <option value="walk">Walk 🚶</option>
                        <option value="hike">Hike 🥾</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Duration In Minutes"
                        value={duration}
                        min={1}
                        max={1000}
                        onChange={(e) =>
                          this.setState({ duration: e.target.value })
                        }
                        autoComplete="off"
                      />
                      {durationError && (
                        <Form.Label style={{color: 'red',fontSize:'13px'}} className="mx-1 my-1" >
                        {durationError}
                      </Form.Label>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Date"
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) =>
                          this.setState({ date: e.target.value })
                        }
                      />
                        {dateError && (
                       <Form.Label style={{color: 'red',fontSize:'13px'}} className="mx-1 my-1" >
                       {dateError}
                     </Form.Label>
                    
                      )}     
                   
                    </Form.Group>

                    <div className="d-flex justify-content-center align-items-center">
                      {/* <Link to={'/output'}> */}
                      <Button variant="success" type="submit" >
                        Add
                      </Button>
                      {/* </Link> */}
                      <Link to={"/output"}>
                        <Button
                          className="mx-3"
                          variant="success"
                          type="submit"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

export default Tracking;
