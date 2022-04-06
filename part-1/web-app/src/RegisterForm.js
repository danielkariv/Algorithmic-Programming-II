
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
    const [image,setImage] = useState("")
    const [isFormValid,setFormValid] = useState(true)
    function validatePassword (str){
        // check if contains only big/small letters or/and digits.
        // TODO: not sure if this is what we need to check here.
        return /^[A-Za-z0-9]*$/.test(str);
    }
    function validateImage(){
        return image != "";
    }
    function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.
        console.log("Try to register")
        setFormValid(username.length>0 && validatePassword(password) && password == repeatPassword && displayName.length>0 && validateImage())
        if(isFormValid){
            var userData = usersDB.find(e => e.username === username)
            if (userData == null) {
                // there isn't any user with given email so we can register him.
                usersDB.push({username,password,displayName,image})
                navigate('/');
            }
            else{
                // failed to register( user exists with given email)
                console.log("Failed to register, email is already in use.")
            }
        } else
            console.log("Given inputs aren't valid (password don't match or isn't same as repeated one)")
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={onSubmitForm}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='text' placeholder='Enter username'  value={username} onChange={(e)=>{setUsername(e.target.value); }}/>
                <Form.Text>
                    Enter the username you wish to use in this service.
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
                    { (password == repeatPassword) ? null : <p style={{color : "red"}}>Password isn't valid, make sure that contains only letters and digits.</p>}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formDisplayName'>
                <Form.Label>Display Name</Form.Label>
                <Form.Control type='text' placeholder='Display Name'  value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}}/>
                <Form.Text>
                    Display name will showed to others, so pick a nice name.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formImage'>
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type='file' placeholder='Load image' value={image.value} onChange={(e)=>{setImage(URL.createObjectURL(e.target.files[0]))}}/>
                <Form.Text>
                    <Image fluid={true} src={image}/>
                    <p>Doesn't work yet.</p>
                </Form.Text>
                
            </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                { isFormValid ? null : <p style={{color : "red"}}>Form isn't valid, make sure all form fields are correct and filled.</p>}
                <p className="text-justify font-italic"> Got an account already? <Link to='/login'>Click here</Link> to login.</p>
            </Form>
    </Container>
  );
}

export default RegisterForm;
