
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
  var usersDB = [{username:"user",password:"1234", displayName:"User",image:"http://localhost:3000/favicon.ico"},
                  {username:"bot",password:"botbot", displayName:"Bot",image:"http://localhost:3000/favicon.ico"},
                  {username:"daniel",password:"abc123", displayName:"Daniel",image:"http://localhost:3000/favicon.ico"},
                  {username:"admin",password:"admin", displayName:"Admin",image:"http://localhost:3000/favicon.ico"},
                  {username:"DanielY",password:"yanovsky123", displayName:"Daniel Yanovsky",image:"http://localhost:3000/favicon.ico"},
                  {username:"yoshi",password:"Woooo!", displayName:"Yoshi",image:"http://localhost:3000/favicon.ico"},]
  // hardcoded messages database (will be replaced when we add backend server)
  // Notice: I wrote it in code, so I pretty sure the timestamp isn't right.
  var messagesDB = [
                     {from:"DanielY",to:"daniel",type:"msg",content:"Hello ", timestamp:new Date(1650143088102)},
                    {from:"daniel",to:"DanielY",type:"msg",content:"hello there!", timestamp:new Date(1650143098102)},
                    {from:"DanielY",to:"daniel",type:"msg",content:"How is the project coming along ", timestamp:new Date(1650143108102)},
                    {from:"daniel",to:"DanielY",type:"msg",content:"fine actually!", timestamp:new Date(1650143118102)},
                    {from:"DanielY",to:"daniel",type:"msg",content:"How is the project coming along ", timestamp:new Date(1650143108102)},
                    {from:"daniel",to:"DanielY",type:"msg",content:"fine actually!", timestamp:new Date(1650143118102)},
                    {from:"DanielY",to:"daniel",type:"msg",content:"When are we going to finish this shit!? ", timestamp:new Date(1650143128102)},
                    {from:"daniel",to:"DanielY",type:"msg",content:"I dont know", timestamp:new Date(1650143138102)},
                    {from:"DanielY",to:"daniel",type:"msg",content:"lets try doing it faster ", timestamp:new Date(1650143148102)},
                    {from:"user",to:"DanielY",type:"msg",content:"Ok", timestamp:new Date(1650143158102)},
                    {from:"user",to:"DanielY",type:"msg",content:"so'", timestamp:new Date(1650143168102)},
                    {from:"daniel",to:"DanielY",type:"msg",content:"Ok", timestamp:new Date(1650143158102)},
                    {from:"DanielY",to:"user",type:"msg",content:"lets try somting ", timestamp:new Date(1650143148102)},
                    {from:"yoshi",to:"DanielY",type:"img",content:"http://localhost:3000/pic/pic1.jpg", timestamp:new Date(1650143158102)},
                    {from:"DanielY",to:"bot",type:"aud",content:"http://localhost:3000/pic/hourse.mp3 ", timestamp:new Date(1650153148102)},
                    {from:"DanielY",to:"bot",type:"vid",content:"http://localhost:3000/pic/vid.mp4 ", timestamp:new Date(1650154148102)}
                   
                    // {from:"",to:"",type:"",content:"", timestamp:""},
                  ]
                 
  return (
    <div className="App">
      <Routes>
        {/* Notice: if you sent to login from url "localhost:3000/" then it work fine
                    when user isn't login in the app yet, it send you to login form (see login at Messenger.js)  */}
        <Route path="/" element={<Messenger user={user} usersDB={usersDB} messagesDB={messagesDB}/>}/>
        <Route path="/login" element={<LoginForm usersDB={usersDB} setUser={setUser}/>}/> 
        <Route path="/register" element={<RegisterForm usersDB={usersDB}/>}/>
      </Routes>
    </div>
  );
}

export default App;
