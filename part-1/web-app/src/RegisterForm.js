
import './App.css';
import './RegisterForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function RegisterForm({usersDB}) {
    const navigate = useNavigate();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [displayName,setDisplayName] = useState("")
    function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.
        console.log("Try to register")
        // TODO: validate given inputs.
        var userData = usersDB.find(e => e.email === email)
        if (userData == null) {
            // there isn't any user with given email so we can register him.
            usersDB.push({email,password,displayName})
            navigate('/');
        }
        else{
            // failed to register( user exists with given email)
            console.log("Failed to register, email is already in use.")
        }
         // TODO: add error information to form, so we can report what is wrong.
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={onSubmitForm}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email'  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <Form.Text>
                    Enter your email you wish to use in this service.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <Form.Text>
                    Pick strong password and don't share it with strangers.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formDisplayName'>
                <Form.Label>Display Name</Form.Label>
                <Form.Control type='text' placeholder='Display Name'  value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}}/>
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
