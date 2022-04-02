
import './App.css';
import './RegisterForm.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

function RegisterForm(updateCallback) {

    function tryRegister(e){
        e.preventDefault();
        console.log("Try to register")
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={tryRegister}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email'/>
                <Form.Text>
                    Enter your email you wish to use in this service.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password'/>
                <Form.Text>
                    Pick strong password and don't share it with strangers.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formDisplayName'>
                <Form.Label>Display Name</Form.Label>
                <Form.Control type='text' placeholder='Display Name'/>
                <Form.Text>
                    Display name will showed to others, so pick a nice name.
                </Form.Text>
            </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className="text-justify font-italic"> Got an account already? <Link to='/login'>Click here</Link> to login.</p>
            </Form>
    </Container>
  );
}

export default RegisterForm;
