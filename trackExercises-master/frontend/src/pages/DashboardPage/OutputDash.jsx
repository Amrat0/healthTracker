import { Card, Button, Form, FormText } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import '../../pages/DashboardPage/Dashboard.css';
import NavbarComponent from "../../Navbar/NavbarComponent";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

const OutputDash = () => {
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/data', {
        headers: {
          authorization: localStorage.getItem('token')
        }
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5000/data/${id}`, {
          method: 'DELETE',
        });
        await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          // text: json.message,
          showConfirmButton: false,
          timer: 2000
        });

        fetchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your data is safe!', 'info');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  const handleUpdate = async (id) => {
    try {
      const name = updatedData[id]?.name || data.find(item => item._id === id).name;
      if (!/^[A-Za-z]+$/.test(name)){
        setValidationErrors((prevState) => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            name: "Name must contain only letters",
          },
        }));
        return;
      }
      const description = updatedData[id]?.description || data.find(item => item._id === id).description;
      if (!/^[A-Za-z]+$/.test(description)) {
        setValidationErrors((prevState) => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            description: 'Description must contain only letters',
          },
        }));
        return;
      }
      const duration = updatedData[id]?.duration || data.find(item => item._id === id).duration;
      if (parseInt(duration) <= 0) {
        setValidationErrors((prevState) => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            duration: 'Duration must be greater than 0',
          },
        }));
        return;
      }

      const selectedDate = new Date(updatedData[id]?.date || data.find(item => item._id === id).date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        selectedDate.setDate(currentDate.getDate()); // Set the selected date to the current date
        setUpdatedData(prevData => ({
          ...prevData,
          [id]: {
            ...prevData[id],
            date: selectedDate.toISOString().split("T")[0],
          }
        }));
      }

      const response = await fetch(`http://localhost:5000/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData[id]),
      });

      const updatedItem = await response.json();
      console.log('Data updated:', updatedItem);
      fetchData();
      setEditMode((prevState) => ({
        ...prevState,
        [id]: false,
      }));
      setUpdatedData((prevState) => ({
        ...prevState,
        [id]: {},
      }));
      setValidationErrors((prevState) => ({
        ...prevState,
        [id]: {},
      }));

      Swal.fire({
        icon: 'success',
        title: 'Data Updated',
        text: 'The data has been updated successfully',
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      }
    }));
  };

  return (
    <>
      <NavbarComponent />
      <div className="d-flex justify-content-center">
        <Button className=" mx-3 my-3" variant="danger" onClick={handleBack}>Go back</Button>
        <Link to={'/inputData'}>
          <Button className=" mx-3 my-3 px-4" variant="success" onClick={handleBack}>Add</Button>
        </Link>
      </div>
      <div className="d-flex  justify-content-space-between flex-wrap  justify-content-center  mt-4" >

        {data.map((item) => (
          <div key={item._id}>
            <div className="d-flex justify-content-center align-items-center add mx-3"  >
              <Card style={{ width: '20rem', boxShadow: '-1px 1px  4px 1px  purple', }} key={item._id} className="mb-3">
                <Card.Body>
                  {editMode[item._id] ? (
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          maxLength={12}
                          value={updatedData[item._id]?.name || item.name}
                          onChange={(event) => handleInputChange(event, item._id)}
                        />

                        {validationErrors[item._id]?.name && (
                          <FormText className="text-danger">{validationErrors[item._id].name}</FormText>
                        )}


                      </Form.Group>
                      <Form.Group controlId="formAge">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="description"
                          maxLength={20}
                          value={updatedData[item._id]?.description || item.description}
                          onChange={(event) => handleInputChange(event, item._id)}
                        />
                        {validationErrors[item._id]?.description && (
                          <Form.Text className="text-danger">{validationErrors[item._id].description}</Form.Text>
                        )}
                      </Form.Group>

                      <Form.Group className="my-3">
                        <Form.Select
                          value={updatedData[item._id]?.activity || item.activity}
                          onChange={(event) => handleInputChange(event, item._id)}
                          className="mb-3"
                          name="activity"
                        >
                          <option autoComplete="off" selected disabled hidden>
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

                      <Form.Group controlId="formAge">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                          type="number"
                          name="duration"
                          min={1}
                          max={1000}
                          value={updatedData[item._id]?.duration || item.duration}
                          onChange={(event) => handleInputChange(event, item._id)}
                        />
                        {validationErrors[item._id]?.duration && (
                          <Form.Text className="text-danger">{validationErrors[item._id].duration}</Form.Text>
                        )}
                      </Form.Group>

                      <Form.Group controlId="formAge">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={updatedData[item._id]?.date || item.date}
                          onChange={(event) => handleInputChange(event, item._id)}
                        />
                        {validationErrors[item._id]?.date && (
                          <Form.Text className="text-danger">{validationErrors[item._id].date}</Form.Text>
                        )}
                      </Form.Group>
                      <Button className="d-block text-center my-3 " variant="primary" onClick={() => handleUpdate(item._id)}>Update</Button>
                    </Form>
                  ) : (
                    <>
                      <Card.Title>Name</Card.Title>
                      <Card.Text>{item.name}</Card.Text>

                      <Card.Title>Description</Card.Title>
                      <Card.Text>{item.description}</Card.Text>

                      <Card.Title>Activity</Card.Title>
                      <Card.Text>{item.activity}</Card.Text>

                      <Card.Title>Duration</Card.Title>
                      <Card.Text>{item.duration}</Card.Text>

                      <Card.Title>Date</Card.Title>
                      <Card.Text>{item.date}</Card.Text>

                      <Button className=" mx-3 px-4" variant="primary" onClick={() => setEditMode((prevState) => ({ ...prevState, [item._id]: true }))}>Edit</Button>
                    </>
                  )}
                  <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>

                </Card.Body>
              </Card>
            </div>
            <div className="my-3"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OutputDash;