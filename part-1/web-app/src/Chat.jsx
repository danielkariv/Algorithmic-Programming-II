
import './Chat.css';
import Popup from './Popup';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Stack ,Image} from "react-bootstrap";

function TwoDigits(temp)
{
  temp=parseInt(temp);
  if (temp> 9)
        return temp;
    else
    return "0" +temp;

}

function Chat({user, selectedUser, messagesDB})
{
  //will be use in the popup
  const [buttonPopup,setButtonPopup]=useState(false);
  const [imgsrc,setImgsrc]=useState("");
  const [msgkind,setmsgkind]=useState("");
    /* There is access to:
        - current user that has login.
        - selected user that was selected from Chatbook.
        - messagesDB which we are using to get the messages between current user and selected user.

        with those, it should be fine to display the currect messages and add new messages.
        Notice: there are build-in functions for arrays, like find() and sort() functions, no need to reinvent the wheel here.
    */

        //Will be the username string
      var username="";
      var selectedname="";
     
      if (user != null)
       username= user.username;
       if (selectedUser != null)
       selectedname= selectedUser.username;
      //Will hold the masseges with the user
      var usermessagesDB=[];
      
      for ( var msg of messagesDB)
      {
        if (username.length !=0)
        if ((msg.from == username && msg.to ==selectedname)|| (msg.to == username && msg.from ==selectedname))
         usermessagesDB.push(msg);
      }
      //will hold the the masseges sorted by date
      var sortedusermessagesDB= usermessagesDB.sort(function(a,b){return new Date(b.timestamp)-new Date(a.timestamp)});
      
      const msgitem=sortedusermessagesDB.map((bookitem,key) =>{
        var name= "";
        (bookitem.from === username)?name=bookitem.to :name=bookitem.from;
        var content="";
        var time;
        var cname="";
        var dname="";
        var path="";
        //cheking if the massege was sent
        (bookitem.from === username)?cname="message-main-sender" :cname="message-main-receiver";
        (bookitem.from === username)?dname="sender" :dname="receiver";
          if (msg)
         time= TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());
        if (bookitem.type =="msg")
        {
        content=bookitem.content;
       
  
        }
        else if (bookitem.type =="img" ||bookitem.type =="aud" ||bookitem.type =="vid")
        {
            content= bookitem.content;
                  path="\""+content+"\"";
                  
            
        }
       
      return (
              <Row className='message-body' style={{height:"100 px"}} >
                <Col className={cname}>
                  <div class={dname}>
                  <div class="message-text">
                  {(bookitem.type==="msg")? content : ((bookitem.type==="img")? <img class="pic" src={window.location.origin + content} onClick={()=>{ setmsgkind("img");setButtonPopup(true); setImgsrc(content)}} ></img>: ((bookitem.type==="aud")? <audio controls> <source src={window.location.origin + content} type="audio/mpeg"/></audio> :((bookitem.type==="vid")? <img class="pic" src={window.location.origin + "/pic/vidpic.png"} onClick={()=>{ setmsgkind("vid");setButtonPopup(true); setImgsrc(content)}} ></img>: "") )) }
                   </div>
                   <span class="message-time pull-right">{time}</span>
                   </div>
                </Col>
               
              </Row>
      );
        
    });

    return (
      <>
       <Container className="d-flex flex-column" style={{height:"100%"}}>
            {/* Top bar, image and username with chat with.*/}
           <Row>
                <Col>
                Image
                </Col>
                <Col>
                Second Username
                </Col>
           </Row>
           {/* The chat itself, need to be scrollable, and have rows inside with messages.
                TODO: make it strech to all avaiable height. */}
           <Row style={{"flexGrow" : "1"}}>
              <Container className='chat'>
                
              {msgitem}
                 
              </Container>
           </Row>
           {/* Input bar for message, image, video or audio.*/}
           <Row>
           <Form>
                <Row>
                <Col className='col-2'>
                    <Button variant="primary" type="submit">
                    File
                    </Button>
                </Col>
                <Col className='col-8'>
                    <Form.Group  controlId="formInputMessage">
                    <Form.Control type="text" placeholder="Enter text ... " />
                    </Form.Group>
                </Col>
                <Col className='col-2'>
                    <Button variant="primary" type="submit">
                    Add
                    </Button>
                </Col>
                </Row>
            </Form>
           </Row>
       </Container>
         <Popup triggerd={buttonPopup} setTrigger={setButtonPopup} kind={msgkind} imgsrc={imgsrc}>
        
      </Popup>
      </>
        );
}
export default Chat;