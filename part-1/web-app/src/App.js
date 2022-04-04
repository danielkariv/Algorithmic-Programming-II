
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Messenger from './Messenger';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  
  var [user, setUser] = useState(null);
  setUser = (name)=>{
    console.log("Trying update user info. : " + name)
  };
  return (
    <div className="App">
      <Routes>
        {/* TODO: index ("/") path should be point to message board, which link back to login form if user not login. */}
        <Route path="/" element={<Messenger/>}/>
        <Route path="/login" element={<LoginForm setUser={setUser}/>}/> 
        <Route path="/register" element={<RegisterForm setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
