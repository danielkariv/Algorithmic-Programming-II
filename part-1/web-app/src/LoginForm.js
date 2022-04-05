
import './LoginForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function LoginForm({usersDB,setUser}) {
    const navigate = useNavigate();
    // maybe use a single state for this (user={email:..., password:...})
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.
        // TODO: validate given inputs.
        var userData = usersDB.find(e => e.email === email && e.password === password )
        if (userData != null) {
            // if it works, userData has all the data on this user, we would save it for later app usage.
            console.log("I AM IN!! ", userData.displayName)
            setUser(userData)

            navigate('/');
        }
        else{
            // failed to login (wrong password or user just not exist..)
            // TODO: show error message in the Login Form (lower to submit button?).
            console.log("Failed to login, wrong email/password!")
        }
        // TODO: add error information to form, so we can report what is wrong.
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={onSubmitForm}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <Form.Text>
                    Place enter the email you register with to the service. 
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <Form.Text>
                    Don't share your password with strangers, silly.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                    Submit
                </Button>
            <p className="text-justify font-italic"> Not registered? No problem, <Link to='/register'>Click here</Link> to register and join our community</p>
        </Form>
    </Container>
  );
}

export default LoginForm;
