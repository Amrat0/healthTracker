import '../RegisterPage/Register.css';
import { Container, Col, Form, Button, Card, InputGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from '../../Navbar/NavbarComponent'
import { Component } from 'react';
import regGif from '../../Images/regGif.gif'
import Swal from 'sweetalert2';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            validationErrors: {} // Object to hold validation errors
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { fname, lname, email, password } = this.state;
        let errors = {};
        let isValid = true;

        // Validate first name
        if (fname.trim() === "") {
            errors.fname = "First name is required";
            isValid = false;
        } else if (!/^[a-zA-Z ]+$/.test(fname.trim())) {
            errors.fname = "First name should contain only letters";
            isValid = false;
        }

        // Validate last name
        if (lname.trim() === "") {
            errors.lname = "Last name is required";
            isValid = false;
        } else if (!/^[a-zA-Z ]+$/.test(lname.trim())) {
            errors.lname = "Last name should contain only letters";
            isValid = false;
        }

        // Validate email
        if (email.trim() === "") {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = "Invalid email format";
            isValid = false;
        }

        // Validate password
        if (password.trim() === "") {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            errors.password = "Password should be at least 6 characters long";
            isValid = false;
        }

        this.setState({ validationErrors: errors });
        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) {
            return;
        }

        const { fname, lname, email, password } = this.state;
        console.log(fname, lname, email, password);

        // Rest of your code...
        fetch('http://localhost:5000/register', {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acess-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                password,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "Your Registered!")

                if (data.status === "Ok") {
                    // alert("Registered successful");
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
                        title: 'Registered successfully'
                      }).then(()=>{
                        window.localStorage.setItem("loggedIn", true);
                        window.location.replace('/dashboard');
                      })   

                      
                    window.localStorage.setItem("token", data.data);
                    // window.localStorage.setItem("loggedIn", true);
                    // window.location.replace('/dashboard');
                    // window.location.replace('/login');
                } else {
                    Swal.fire({
                        text: 'User Already Exits!',
                        icon: 'error',
                
                        confirmButtonText: 'OK'
                      })
                }
            });
    }

    render() {
        const { validationErrors } = this.state;

        return (
            <>
                <NavbarComponent />
        <img src={regGif} alt="Register" width="14%" style={{  display: "block", marginLeft: "auto", marginRight: "auto",marginTop: '20px',marginBottom: '0 ' }} />

                <Container>
                    <Col md={6} className='register-center mt-0'>
                        <Card className='mx-4 RegisterForm mt-2' style={{boxShadow: '0.1px 0.1px 4px 0.1px  purple',}} >
                            <Form onSubmit={this.handleSubmit} className='px-4'>
                                <h3 className='text-center'><b>Sign Up</b></h3>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) => this.setState({ fname: e.target.value })}
                                        isInvalid={!!validationErrors.fname}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.fname}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={(e) => this.setState({ lname: e.target.value })}
                                            isInvalid={!!validationErrors.lname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.lname}
                                        </Form.Control.Feedback>
                                    
                                    </InputGroup>

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationCustomUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            isInvalid={!!validationErrors.email}
                                            aria-describedby="inputGroupPrepend"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {validationErrors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        isInvalid={!!validationErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <Button variant="success" type="submit" className='mt-2 mb-2' >Sign Up</Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Container>
            </>
        )
    }
}
export default Register;
