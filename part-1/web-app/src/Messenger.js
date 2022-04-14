
import './App.css';
import './RegisterForm.css';
import './Messenger.css';
import Chat from './Chat';
import Chatbook from './Chatbook';
import SendStuff from './SendStuff';

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
      <Container style={{  width: "50%", height: "200px" ,marginTop: "5%", marginLeft: "auto",marginRight: "auto" ,textAlign: "left", }}>
       <Row  className="h-10 rows">
         <Col md ={5} lg={5} className="colum">
         Name
         </Col>
         <Col   md ={1} lg={1} className="colum">
           Add
         </Col>
         <Col  md ={6} lg={6} className="colum">
           NametoChat
         </Col>
       </Row>
       <Row className=" h-80 rows" style ={{height: "200px"}}>
           <Col md ={6} lg={6} className="colum">
           <Chatbook />
           </Col>
           <Col md ={6} lg={6} className="colum">
           <Chat />
           </Col>
       </Row>
       <Row  className="h-10 rows">
       <Col md ={6} lg={6} className="colum">
           
            c
            </Col>
           <Col md ={6} lg={6} className="colum">
             <SendStuff />
           </Col>
       </Row>
      </Container>
    
  );
}

export default Messenger;
