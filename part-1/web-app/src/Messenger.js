
import './App.css';
import './RegisterForm.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Messenger() {
    const navigate = useNavigate();
    useEffect(() => {    
        validateUser();
    });

    function validateUser(){
    // This suppose to check if user is saved in cookie, or state.
    // For now, as no backend exist, it will check only user state (init as 0)
    console.log(window.location.href);
    
    navigate('/login');
    }
  return (
    <Container className="col-12 col-sm-9 col-lg-6  Panel">
    Hello world
    </Container>
  );
}

export default Messenger;
