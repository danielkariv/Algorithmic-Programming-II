
import './LoginForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function LoginForm({setUser}) {
    const navigate = useNavigate();
    // maybe use a single state for this (user={email:..., password:...})
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isFormValid,setFormValid] = useState(true)
    async function onSubmitForm(e){
        e.preventDefault(); // prevent default logic.

        // check that input aren't empty.
        if (username.length > 0 && password.length > 0){
            
            const response = await fetch("http://localhost:5123/Users/Login", {
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
                    "id" : username, "password" : password
                }) // body data type must match "Content-Type" header
              });
            //console.log(response);
            if(response.ok == true){
                const response = await fetch("http://localhost:5123/Users/Details/?id=" + username, {
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
                        "id" : username
                    }) // body data type must match "Content-Type" header
                    });
                //console.log(response);
                if(response.ok){
                    const data = await response.json();
                    // we are getting {id : "", name: ""}
                    // we need to change it to the naming in the react app.
                    //console.log(data);
                    setUser({"username": data.id, "displayName":data.name});
                    setFormValid(true)
                    navigate('/');
                }else{
                    // printing error
                    console.log("Failed to get details on user.")
                    setFormValid(false)
                }
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
    <Container className="AroundPanelPadding">
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
    </Container>
  );
}

export default LoginForm;
