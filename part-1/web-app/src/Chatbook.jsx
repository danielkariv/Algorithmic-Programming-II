 import './Chatbook.css';
import './pic/pic1.jpg';
import { Container,Row,Form,Col,Button,ListGroup,ListGroupItem ,Image } from "react-bootstrap";

import React, { useState, useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';

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
      var username="";
      var userimg="";
       var displayname="";
   if (user != null)
   {
    username= user.username;
    userimg=user.image;
    displayname=user.displayName;
   }
   //Will hold the masseges with the user
   var usermessagesDB=[];
   
   for ( var msg of messagesDB)
   {
     if (username.length !=0)
     if (msg.from == username || msg.to ==username)
      usermessagesDB.push(msg);
   }
   //will hold the the masseges sorted by date
   var sortedusermessagesDB= usermessagesDB.sort(function(a,b){return new Date(b.timestamp)-new Date(a.timestamp)});
      console.log(sortedusermessagesDB);
      //will hold the last msg from each user to our user.
    var chatbooklist=[];
  
    for ( var msg of sortedusermessagesDB)
   {
     console.log(1);
       var con =true;
    for (var i of chatbooklist)
    {
      if ((msg.from != username && (msg.from == i.from|| msg.from == i.to) )|| (msg.to != username && (msg.to == i.from|| msg.to == i.to)))
      con=false;
    }
     if (con)   
    chatbooklist.push(msg);
   }
   function Click(v)
   {
     for (var user of usersDB)
      if(user.username ==v)
      setSelectedUser(user);
   }
 
    const bookitemlist=chatbooklist.map((bookitem,key) =>{
        var name= "";
        (bookitem.from === username)?name=bookitem.to :name=bookitem.from;
        var content="";
        var time;
        var usertosend=[];
        for (var user of usersDB)
        if(user.username ==name)
        usertosend=user;
         time= TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());
        if (bookitem.type =="msg")
        content=bookitem.content;
        else if (bookitem.type =="img")
        content="image";
        else if (bookitem.type =="vid")
        content="video";
        else if (bookitem.type =="aud")
        content="audio";
      return (
              <Row className="stam" style={{height:"100 px"}} onClick={() => Click(name)}>
                <Col  className=" user-pic col-3" style={{}}>
                  <Image src={usertosend.image} >

                  </Image>
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
                  <span class="time-meta pull-right">{time}</span>
                  
                </Col>
              </Row>
      );
    });
    return (
        <Container className="d-flex flex-column" style={{height:"100%" ,maxHeight:"800px", minHeight:"400px"}}>
       {/* Row of input */}
       <Row>
       <Form>
         <Row>
         <Col className='user-pic col-3'>
           
         <img src={userimg}></img> 
           </Col>
           <Col className='col-6'>
             { displayname}
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
     <Row  style={{"flexGrow" : "1"}}>
      <Container  style={{height:"auto",overflow:"auto",backgroundColor:"white"}}>
        {bookitemlist}
      </Container>
     </Row>
     </Container>
    
    );
}
export default Chatbook;