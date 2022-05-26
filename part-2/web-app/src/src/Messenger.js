
import './App.css';
import './Messenger.css';
import Chat from './Chat';
import Chatbook from './Chatbook';
import {HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from "react-router-dom";


function Messenger({user ,updateInfo, setUpdateInfo ,Connection, setConection }) {

    // used to send client to different views. ( use navigate('/SOMEWHERE') in logic to jump to localhost:3000/SOMEWHERE )
    const navigate = useNavigate();
    useEffect(() => {    
        validateUser();
    });

    const [selectedUser, setSelectedUser] = useState(null);
   
   
    function validateUser(){
    // This suppose to check if user is saved as state.
    // For now, as no backend exist, it will check only user state (init as null)
      if (user === null)
        navigate('/login');
    }
   
   // console.log(user.username);
    
   
  //  console.log(Connection);
   // console.log(1111111);
  
  // TODO: need to design the Messenger UI. afterword, we need to make the logic works.
  // Notice: messages information should be kept in App.js for now, when we will have a backend server, we will add it requests to the functions to recive it from there.
  return (
    <Container className="MessengerWindowPadding">
    <Container className="col-10 MessengerWindow" fluid>
      <Row style={{height:"100%"}}>
      {/* Left Column (how we chat with, and option to add new user to list) */}
      <Col className="col-6">
        <Chatbook Connection={Connection} setSelectedUser={setSelectedUser} selectedUser={selectedUser} user={user} updateInfo={updateInfo} setUpdateInfo={setUpdateInfo}/>
        
      </Col>
      <Col className="col-6" style={{padding:"0px",margin:"0px"}}>
        <Chat Connection={Connection} selectedUser={selectedUser} user={user} updateInfo={updateInfo} setUpdateInfo={setUpdateInfo}/>
      </Col>
      </Row>
    </Container>
</Container>
  );
}

export default Messenger;