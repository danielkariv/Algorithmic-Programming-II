
import './App.css';
import './RegisterForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Messenger({user}) {

    // used to send client to different views. ( use navigate('/SOMEWHERE') in logic to jump to localhost:3000/SOMEWHERE )
    const navigate = useNavigate();
    useEffect(() => {    
        validateUser();
    });

    function validateUser(){
    // This suppose to check if user is saved as state.
    // For now, as no backend exist, it will check only user state (init as null)
      if (user === null)
        navigate('/login');
    }
  // TODO: need to design the Messenger UI. afterword, we need to make the logic works.
  // Notice: messages information should be kept in App.js for now, when we will have a backend server, we will add it requests to the functions to recive it from there.
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
    Hello world
    </Container>
  );
}

export default Messenger;
