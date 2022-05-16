
import './App.css';
import './RegisterForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function RegisterForm({usersDB}) {
    const navigate = useNavigate();

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [displayName,setDisplayName] = useState("")
    const [isFormValid,setFormValid] = useState(true)
    const [isUsernameFree,setUsernameFree] = useState(true)

    function validatePassword (str){
        // check if contains only big/small letters or/and digits.
        // TODO: not sure if this is what we need to check here.
        return /^[A-Za-z0-9]*$/.test(str);
    }
    async function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.
        //console.log("Try to register")
        var isValid = username.length>0 && validatePassword(password) && password === repeatPassword && password.length > 0 && repeatPassword.length > 0 && displayName.length>0
        setFormValid(isValid)
        if(isValid){
            const response = await fetch("http://localhost:5123/Users/Register", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    "id" : username,"name":displayName, "password" : password
                }) // body data type must match "Content-Type" header
              });
            
              if(response.ok == true){
                // there isn't any user with given email so we can register him.
                setUsernameFree(true);
                navigate('/');
            }
            else{
                // failed to register( user exists with given email)
                console.log("Failed to register, email is already in use.")
                setUsernameFree(false);
            }
        } else
            console.log("Given inputs aren't valid (password don't match or isn't same as repeated one)")
    }
  return (
      <Container className="AroundPanelPadding">
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={onSubmitForm}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username'  value={username} onChange={(e)=>{setUsername(e.target.value); }}/>
                <Form.Text>
                    Enter the username you wish to use in this service.
                    {(isUsernameFree === true)? null : <p style={{color : "red"}}>Selected username is already used. please choose a different one.</p>}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
                <Form.Text>
                    Pick password that only contains: Letters (Big or small), and/or digits.
                    { validatePassword(password) ? null : <p style={{color : "red"}}>Password isn't valid, make sure that contains only letters and digits.</p>}
                </Form.Text>
                
            </Form.Group>
            <Form.Group controlId='formRepeatPassword'>
                <Form.Label>Password Again</Form.Label>
                <Form.Control type='password' placeholder='Password'  value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value); }}/>
                <Form.Text>
                    Make sure to write the same password.
                    { (password === repeatPassword) ? null : <p style={{color : "red"}}>Repeated password isn't the same as password.</p>}
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
            { isFormValid ? null : <p style={{color : "red"}}>Form isn't valid, make sure all form fields are correct and filled.</p>}
            <p className="text-justify font-italic"> Got an account already? <Link to='/login'>Click here</Link> to login.</p>
            </Form>
    </Container>
    </Container>
  );
}

export default RegisterForm;
