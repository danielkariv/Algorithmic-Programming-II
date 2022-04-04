
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Messenger from './Messenger';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  // not sure what we should save here. Probably display name, and some kind of a key of user (ID/Email).
  // other stuff should be saved locally at messenger component.
  var [user, setUser] = useState(null);
  setUser = (name)=>{
    console.log("Trying update user info. : " + name)
  };
  // not final but I won't put too much thinking about it, we will drop it when we will have a backend server.
  // So, it needs only the basic information needed for messanger, and to login/register.
  var [users,setUsers] = useState([
    {email:"daniel@mail.com", password:"1234", displayName:"Daniel K.",},
    {email:"Test", password:"P@sSw0rd", displayName:"DisplayNameTest",}
  ]);
  
  return (
    <div className="App">
      <Routes>
        {/* Notice: if you sent to login from url "localhost:3000/" then it work fine
                    when user isn't login in the app yet, it send you to login form (see login at Messenger.js)  */}
        <Route path="/" element={<Messenger/>}/>
        <Route path="/login" element={<LoginForm setUser={setUser}/>}/> 
        <Route path="/register" element={<RegisterForm setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
