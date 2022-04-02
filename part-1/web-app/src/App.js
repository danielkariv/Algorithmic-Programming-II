
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Messenger from './Messenger';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  
  var [user, setUser] = useState(0);
  setUser = ()=>{
    console.log("Trying update user info.")
  };
  return (
    <div className="App">
      <Routes>
        {/* TODO: index ("/") path should be point to message board, which link back to login form if user not login. */}
        <Route path="/" element={<Messenger/>}/>
        <Route path="/login" element={<LoginForm updateCallback={setUser}/>}/> 
        <Route path="/register" element={<RegisterForm updateCallback={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
