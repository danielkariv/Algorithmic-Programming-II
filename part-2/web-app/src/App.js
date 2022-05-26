
import './App.css';
import React, { useState, useEffect ,getData} from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Messenger from './Messenger';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {signalR,HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
import { getDefaultNormalizer } from '@testing-library/react';
function App() {
  // not sure what we should save here. Probably display name, and some kind of a key of user (ID/Email).
  // other stuff should be saved locally at messenger component.
  const [user, setUser] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [Connection, setConection] = useState();
  const [track,SetTrack]= useState([]);
 
  //will be used when we do a valid login
  const joinconnection= async(username) =>{
    try
    {
      //7048
     const connection = new HubConnectionBuilder().withUrl("https://localhost:7048/myHub").build();
      // const connection =new signalR.HubConnectionBuilder() .withUrl("https://localhost:5048/myHub", { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets }) .build();  
     //console.log(username);
    // .withUrl("https://localhost:5123/myHub")
    // .configureLogging(LogLevel.Information)
    
     
           // console.log(connection);
           //do a flip to update
           connection.on("Update", ()=>{                         
                 /*
             useEffect(() => {setUpdateInfo(!updateInfo)},[])    ;
             useEffect( console.log(updateInfo),[updateInfo]); 
             */
            
                  
                   SetTrack(track => [...track,"1"]);
              //  const j=!updateInfo;
               // console.log(j);
               // setUpdateInfo(j);
                
              
              
             
           });
           connection.on("Printmsg",(msg) =>{
                  
                       console.log(34534);
           });
           
           await  connection.start();
          await connection.invoke("join",username)
        setConection(connection);
    }
    catch (e)
    {
         console.log(e);
    }
    }
    useEffect(() => {
         var j=1;
    },[updateInfo]);

  return (
    <div className="App">
      <Routes>
        {/* Notice: if you sent to login from url "localhost:3000/" then it work fine
                    when user isn't login in the app yet, it send you to login form (see login at Messenger.js)  */}
        <Route path="/" element={<Messenger user={user} track={track} updateInfo={updateInfo} setUpdateInfo={setUpdateInfo} Connection={Connection} setConection={setConection}/>}/>
        <Route path="/login" element={<LoginForm user= {user} setUser={setUser} joinconnection={joinconnection} Connection={Connection} setConection={setConection}/>}/> 
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
