
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
       <div class="container">
        
     <table  class="Msg">
       <thead>
      
       </thead>
        <tbody >
          <tr>
            <td>
            <table class="head">
              <thead>

              </thead>
              <tbody>
               <tr>
                 <td className='User'>
                   username
                 </td>
                 <td className='Add'>
                   add
                 </td>
                 <td className='UserTosend'>
                   user to add
                 </td>
               </tr>
              </tbody>
            </table>
            </td>
          </tr>
          <tr>
            <td>
            <table class="mid">
              <thead>

              </thead>
              <tbody>
              <tr>
                 <td className='Chats'>
                   <Chatbook />
                 </td>
                 
                 <td className='Chat'>
                  <Chat />
                 </td>
               </tr>
              </tbody>
            </table>
            </td>
          </tr>
          <tr>
            <td>
            <table class="end">
              <thead>

              </thead>
              <tbody>
              <tr>
                 <td className='fill'>
                   
                 </td>
                 
                 <td className='send'>
                  <SendStuff />
                 </td>
               </tr>
              </tbody>
            </table>
            </td>
          </tr>
        </tbody>
     </table>
     </div>
    
  );
}

export default Messenger;
