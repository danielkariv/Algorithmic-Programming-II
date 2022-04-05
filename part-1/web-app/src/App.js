
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Messenger from './Messenger';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  // not sure what we should save here. Probably display name, and some kind of a key of user (ID/Email).
  // other stuff should be saved locally at messenger component.
  const [user, setUser] = useState(null);

  // hardcoded user database (will be replaced when we add backend server)
  var usersDB = [{email:"user@mail.com",password:"1234", displayName:"User"},
                  {email:"bot@mail.com",password:"botbot", displayName:"Bot"},
                  {email:"daniel@mail.com",password:"abc123", displayName:"Daniel"},
                  {email:"admin@mail.com",password:"admin", displayName:"Admin"},
                  {email:"yoshi@yahoo.com",password:"Woooo!", displayName:"Yoshi"},]
  // hardcoded messages database (will be replaced when we add backend server)
  // Notice: I wrote it in code, so I pretty sure the timestamp isn't right.
  var messagesDB = [{from:"user@mail.com",to:"bot@mail.com",type:"msg",content:"Hello bot!", timestamp:"123"},
                    {from:"bot@mail.com",to:"user@mail.com",type:"msg",content:"HELLO USER BEEP BOOP!", timestamp:"234"},
                    // {from:"",to:"",type:"",content:"", timestamp:""},
                  ]
  return (
    <div className="App">
      <Routes>
        {/* Notice: if you sent to login from url "localhost:3000/" then it work fine
                    when user isn't login in the app yet, it send you to login form (see login at Messenger.js)  */}
        <Route path="/" element={<Messenger user={user}/>}/>
        <Route path="/login" element={<LoginForm usersDB={usersDB} setUser={setUser}/>}/> 
        <Route path="/register" element={<RegisterForm usersDB={usersDB}/>}/>
      </Routes>
    </div>
  );
}

export default App;
