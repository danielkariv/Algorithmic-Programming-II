 import './Chatbook.css';
import { Container,Row,Form,Col,Button ,Image } from "react-bootstrap";

import React, { useState, useEffect } from 'react';

function TwoDigits(temp)
{
  temp=parseInt(temp);
  if (temp> 9)
        return temp;
    else
    return "0" +temp;

}
function Chatbook({user, setSelectedUser, usersDB, messagesDB})
{
  /* There is access to:
      - current user that has login.
      - a setter for selected user (so we can update Chat for current selected user).
      - usersDB which allows has to get info about users, and add new user to list.
      - messagesDB which we will use to know which users we talked with.

      with those, it should be fine to display which users we talk with, and have the option to add new users to list, and select different users to talk with.
      Notice: there are build-in functions for arrays, like find() and sort() functions, no need to reinvent the wheel here.
    */
   //Will be the username string

  
  const [bookitemlist,setBookitemlist] = useState([]);

  function Click(v)
  {
    for (var user of usersDB)
      if(user.username === v)
        setSelectedUser(user);
  }
  var username = "";
  // useEffect is depending how changes in user prop, so it only updates then.
  useEffect(() => {    
    // init data based on if user already login.
    if (user !== null){
      if (username == user.username){
        return;
      }
      else{
        username = user.username;
      }
    }
    else{
      return; // no reason to build data for unknown user.
    }
    // next, we want to find all related messages from or to our user.
    var usermessagesDB=[];
    for ( var msg of messagesDB)
    {
      // we check each message to find if its related to our user, if so, pushing it to our local array.
      if (username.length !==0) 
      if (msg.from === username || msg.to === username)
        usermessagesDB.push(msg);
    }
    
    // we sorting the messages based on date.
    var sortedusermessagesDB= usermessagesDB.sort(function(a,b){return new Date(b.timestamp)-new Date(a.timestamp)});
    
    // now we collecting last message from each user that communicate with our user.
    var chatbooklist=[];
    for ( var msg of sortedusermessagesDB)
    {
      // TODO: not sure what it suppose to do, belongs to @dani020799 code.
      var con =true;
      for (var i of chatbooklist)
      {
        if ((msg.from !== username && (msg.from === i.from|| msg.from === i.to) )|| (msg.to !== username && (msg.to === i.from|| msg.to === i.to)))
          con=false;
      }
      if (con)   
      chatbooklist.push(msg);
    }
    
    // finally create row for each user in our list, which used later for rendering the chatbook.
    
    var list = (chatbooklist.map((bookitem,key) =>{
      var name= "";
      (bookitem.from === username)?name=bookitem.to :name=bookitem.from;
      var content="";
      var time;
      var usertosend=[];
      for (var user of usersDB)
        if(user.username === name)
          usertosend = user;
      time = TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());
      if (bookitem.type === "msg")
        content=bookitem.content;
      else if (bookitem.type === "img")
        content="image";
      else if (bookitem.type === "vid")
        content="video";
      else if (bookitem.type === "aud")
        content="audio";
    return (
            <Row className="stam" style={{height:"100 px"}} onClick={() => Click(name)}>
              <Col  className=" user-pic col-3" style={{}}>
                <Image src={usertosend.image} />
              </Col>
              <Col className="col-5 ">
                <Container>
                  <Row> 
                    <Col className="namespace">                   
                      {usertosend.displayName}
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="msgspace">
                      {content}
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col className=" col-4">
                {time}
              </Col>
            </Row>);
    }));
    // setting the state as list.
    setBookitemlist(list);
  },[user]);

  return (
    <Container className="d-flex flex-column" style={{height:"100%"}}>
       {/* Row of input */}
      <Row>
       <Form>
        <Row>
          <Col className='user-pic col-3'> 
            {(user !== null)?<img src={user.image}></img>:null }
          </Col>
          <Col className='col-6'>
          {(user !== null)?user.displayName:null }
          </Col>
          <Col className='col-3'>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Col>
         </Row>
       </Form>
     </Row>
     {/* Row of list of chat memebers */}
     <Row style={{"flexGrow" : "1"}}>
      <Container id="booklist" style={{maxHeight:"100%",overflow:"auto",backgroundColor:"white"}}>
        {bookitemlist}
      </Container>
     </Row>
     </Container>
    
    );
}
export default Chatbook;