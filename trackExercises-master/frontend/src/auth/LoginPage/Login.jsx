import React, { Component } from 'react';
import '../LoginPage/Login.css';
import { Button, Card, Form ,Alert} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from '../../Navbar/NavbarComponent';
import logGif from '../../Images/r.gif';
import Swal from 'sweetalert2';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    console.log(email, password);
    fetch('http://localhost:5000/login-user', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "Your Registered!");

        if (data.status === "ok") {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          }).then(()=>{
            window.localStorage.setItem("loggedIn", true);
            window.location.replace('/dashboard');
          })   

          window.localStorage.setItem("token", data.data);

         

       
        } else {
            // return "not found"
            alert("not found    ")
        }
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      this.setState({ emailError: "Please enter your email" });
    } else if (!emailRegex.test(email)) {
      this.setState({ emailError: "Please enter a valid email address" });
    } else {
      this.setState({ emailError: "" });
    }

    // Password validation
    if (!password) {
      this.setState({ passwordError: "Please enter your password" });
    } else if (password.length < 6) {
      this.setState({ passwordError: "Password must be at least 6 characters long" });
    } else {
      this.setState({ passwordError: "" });
    }

    // Rest of your code for handling form submission
    if (email && password) {
      console.log(email, password);
      // ...
    }
  }

  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <>
        <NavbarComponent />
        <img
          src={logGif}
          alt="Register"
          width="10%"
          style={{
            boxShadow: '0.5px 0.5px 6px 0.5px purple',
            borderRadius: '50%',
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: '20px',
            marginBottom: '0 '
          }}
        />

        <div className='mt-0' style={{ justifyContent: 'center', display: 'flex' }}>
          <Card className='mt-2' style={{ width: '25rem', backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '0.1px 0.1px 4px 0.1px purple' }}>
            <Form>
              <Card.Body>
                <Card.Text>
                  <h3 className='text-center '><b>Login</b></h3>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
     {emailError && <Alert variant="danger" className='my-2 py-0'>{emailError}</Alert>}

                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    {/* {passwordError && <div variant="danger" className="error-message">{passwordError}</div>} */}
                    {passwordError && <Alert variant="danger" className='my-2 py-0'>{passwordError}</Alert>}
                  </Form.Group>
                </Card.Text>

                <div className='d-flex justify-content-center'>
                  <Button onClick={this.handleSubmit} variant="success" className='mt-3'>Login</Button>
                </div>

                <div className='d-flex justify-content-center my-3'>
                  <Link to={'/register'} >
                    <Form.Label><u>Don't have an account?</u> </Form.Label>
                  </Link>
                </div>
              </Card.Body>
            </Form>
          </Card>
        </div>
      </>
    );
  }
}

export default Login;
