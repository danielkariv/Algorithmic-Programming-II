
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
  var usersDB = [{username:"user",password:"1234", displayName:"User",image:"/favicon.ico"},
                  {username:"bot",password:"botbot", displayName:"Bot",image:"/favicon.ico"},
                  {username:"daniel",password:"abc123", displayName:"Daniel",image:"/favicon.ico"},
                  {username:"admin",password:"admin", displayName:"Admin",image:"/favicon.ico"},
                  {username:"yoshi",password:"Woooo!", displayName:"Yoshi",image:"/favicon.ico"},]
  // hardcoded messages database (will be replaced when we add backend server)
  // Notice: I wrote it in code, so I pretty sure the timestamp isn't right.
  var messagesDB = [{from:"user",to:"bot",type:"msg",content:"Hello bot!", timestamp:"123"},
                    {from:"bot",to:"user",type:"msg",content:"HELLO USER BEEP BOOP!", timestamp:"234"},
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
