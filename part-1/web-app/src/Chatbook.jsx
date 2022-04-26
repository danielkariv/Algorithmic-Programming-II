 import './Chatbook.css';
import { Container,Row,Form,Col,Button ,Image } from "react-bootstrap";
import Popup from './Popup';
import React, { useState, useEffect } from 'react';

function TwoDigits(temp)
{
  temp=parseInt(temp);
  if (temp> 9)
        return temp;
    else
    return "0" +temp;
}

//return the date of the year.
function Retday(temp)
{
   var dd=temp.getDate();
   var mm= parseInt(temp.getMonth())+1;
   var yyyy= 2000+ parseInt(temp.getYear()) -100;
   var TodayIs=dd+"."+mm+"."+yyyy ;
   return TodayIs;
}

function Chatbook({user, setSelectedUser,selectedUser, usersDB, messagesDB , updateInfo })
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
  const [usernameInput,setUsernameInput] = useState([]);
  const [buttonPopup,setButtonPopup]=useState(false);
  const [error,setError]=useState("");

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
    var Today= new Date();

    var list = (chatbooklist.map((bookitem,key) =>{
      var name= "";
      (bookitem.from === username)?name=bookitem.to :name=bookitem.from;
      var content="";
      var time;
      var usertosend=[];
      var cname="stam";
      for (var user of usersDB)
        if(user.username === name)
          usertosend = user;
          if ( selectedUser!= null && usertosend.username== selectedUser.username)
          {
          cname="stam2";
          }
          else
          {

          }
      if(Retday(Today) == Retday(bookitem.timestamp))
      time = TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());
      else
       time =Retday(bookitem.timestamp);
      if (bookitem.type === "msg")
        content=bookitem.content;
      else if (bookitem.type === "img")
        content="image";
      else if (bookitem.type === "vid")
        content="video";
      else if (bookitem.type === "aud")
        content="audio";
    return (
            <Row className={cname} style={{height:"100 px"}} onClick={() => Click(name)}>
              <Col  className=" user-pic col-3" style={{}}>
                <Image src={usertosend.image} />
              </Col>
              <Col className="col-5 ">
                <Container>
                  <Row> 
                    <Col className="namespace text-truncate">                   
                      {usertosend.displayName}
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="msgspace text-truncate">
                      {content}
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col className=" col-4">
                <span class="time-meta pull-right">{time}</span>
              </Col>
            </Row>);
    }));
    // setting the state as list.
    setBookitemlist(list);
  },[user,updateInfo]);

  function onSubmitUsername(e){
    e.preventDefault(); // prevent default logic.

   // console.log("try to select new user to chat with")
    if(usernameInput.length > 0){
      if (usernameInput === user.username){
        setError("try to speak with yourself");
        return;
      }
      var userData = usersDB.find(e => e.username === usernameInput)
        if (userData != null) {
            // if it works, userData has all the data on this user, we would save it for later app usage.
           setError("");
            setSelectedUser(userData)
            setUsernameInput("");
        }else{
       setError("couldn't find user in database");
        }
    }else{
      setError("empty input in username field");
    }
  }
  return (
    <>
    <Container className="d-flex flex-column" style={{height:"100%", maxHeight:"100%", padding:"0"}}>
       {/* Row of input */}
      
       <Row className='heading' style={{padding:"0"}}>
        <Col className='user-pic col-3'> 
          {(user !== null)?<img src={user.image}></img>:null }
        </Col>
        <Col className='  col-6 text-truncate'>
        {(user !== null)? <h3 style={{textAlign:"justify"}} > {user.displayName} </h3>: null }
        </Col>
        <Col className=' col-3 '>
        <Button onClick={()=>{ setButtonPopup(true); }}>
              Add
            </Button>
        </Col>

      </Row>

     {/* Row of list of chat memebers */}
     <Row style={{"flexGrow" : "1"}}>
      <Container id="booklist" style={{maxHeight:"100%",overflow:"auto",backgroundColor:"white"}}>
        {bookitemlist}
      </Container>
     </Row>
     </Container>
     <Popup triggerd={buttonPopup} setTrigger={setButtonPopup} kind={"NO"} >
     <Form onSubmit={onSubmitUsername} >
       <Container style={{backgroundColor:"white", textAlign:"left",border:"3px solid #000000", height:"150px"}}>
         <Row>
           <h4>Enter  username:</h4>
         </Row>
          <Row>
          <Col className='col-9'>
            <Form.Group controlId="formInputUsername">
              <Form.Control type="text" placeholder="Enter username ... " value={usernameInput} onChange={(e)=>{setUsernameInput(e.target.value)}}/>
            </Form.Group>
          </Col>
          <Col className='col-3'>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Col>
         </Row>
         <Row>
         <p style={{color : "red"}}>{error}</p>
         </Row>
         </Container>
       </Form>
        </Popup>
    </>
    );
}
export default Chatbook;