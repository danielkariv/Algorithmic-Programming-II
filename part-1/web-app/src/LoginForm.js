
import './LoginForm.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";

function LoginForm({setUser}) {
    function tryLogin(e){
        e.preventDefault();
        console.log("Try to login")
        // TODO: get login info from form, then check if user exist and if the password is right.
        // if it does, save the user data (id, ...) locally and move to messenger view.
        // else, tell user that the login isn't right.

        // just checking if I get access to change app's prop (user).
        // probably will update from here by calling App's setter to change its local member for user.
        setUser("Hello world")
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
        <Form className="col-xl-10 mx-auto" onSubmit={tryLogin}>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email'/>
                <Form.Text>
                    Place enter the email you register with to the service. 
                </Form.Text>
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password'/>
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
