
import './LoginForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function LoginForm({usersDB,setUser}) {
    const navigate = useNavigate();
    // maybe use a single state for this (user={email:..., password:...})
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isFormValid,setFormValid] = useState(true)
    function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.

        // check that input aren't empty.
        if (username.length > 0 && password.length > 0){
            // TODO: validate given inputs.
            var userData = usersDB.find(e => e.username === username && e.password === password )
            if (userData != null) {
                // if it works, userData has all the data on this user, we would save it for later app usage.
                console.log("I AM IN!! ", userData.displayName)
                setUser(userData)
                setFormValid(true)
                navigate('/');
            }
            else{
                // failed to login (wrong password or user just not exist..)
                // TODO: show error message in the Login Form (lower to submit button?).
                console.log("Failed to login, wrong email/password!")
                setFormValid(false)
            }
        } else{
            console.log("inputs are empty, form not processed")
            setFormValid(false)
        }
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={onSubmitForm}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                <Form.Text>
                    Place enter the username you register with to the service. 
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
            { isFormValid ? null : <p style={{color : "red"}}>Wrong username/password, please try again.</p>}
                
            <p className="text-justify font-italic"> Not registered? No problem, <Link to='/register'>Click here</Link> to register and join our community</p>
        </Form>
    </Container>
  );
}

export default LoginForm;
