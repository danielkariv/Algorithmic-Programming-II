 import './Chatbook.css';
import { Container,Row,Form,Col,Button ,Image } from "react-bootstrap";
import Popup from './Popup';
import React, { useState, useEffect } from 'react';

function TwoDigits(temp)
{
  if (temp == null || temp == undefined)
    return ""
  temp=parseInt(temp);
  if (temp> 9)
        return temp;
    else
    return "0" +temp;
}

//return the date of the year.
function Retday(temp)
{
  if (temp == null || temp == undefined)
    return ""
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
  const [serverInput,setServerInput] = useState("localhost:5123");
  const [displayNameInput,setDisplayNameInput] = useState([]);
  const [buttonPopup,setButtonPopup]=useState(false);
  const [error,setError]=useState("");

  async function Click(v)
  {
    const response = await fetch("http://localhost:5123/api/contacts/"+v, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              });
              if(response.ok == true)
                setSelectedUser(await response.json())
  }
  var username = "";
  // useEffect is depending how changes in user prop, so it only updates then.
  useEffect( () => {    
    async function asyncFunction(){
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

    const response = await fetch("http://localhost:5123/api/contacts", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              });
    if(response.ok != true){
      console.log("failed to get contacts info.")
    }
    // next, we want to find all related messages from or to our user.
    var contacts=await response.json();
    
    // we sorting the messages based on date.
    var contacts= contacts.sort(function(a,b){ return new Date(b.lastdate)-new Date(a.lastdate)});
    
    // finally create row for each user in our list, which used later for rendering the chatbook.
    var Today= new Date();
    
    var list = (contacts.map((bookitem,key) =>{
      var date;
      if (bookitem.lastdate) date = new Date(bookitem.lastdate) 
      else date = null
      console.log(bookitem)
    return (
            <Row className={"stam"} style={{height:"4.5rem"}} key={key} onClick={() => Click(bookitem.id)}>
              <Col className=" user-pic col-3" style={{}}>
                <Image src={"profile-blue.jpg"}/* TODO: add default iamge (no image support in api)*//>
              </Col>
              <Col className="col-5 ">
                <Container>
                  <Row> 
                    <Col className="namespace text-truncate">                   
                      {bookitem.name}
                    </Col> 
                  </Row>
                  <Row>
                    <Col className="msgspace text-truncate">
                      {bookitem.last}
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col className=" col-4">
                <span className="time-meta pull-right">{
                (date != null)? (Retday(Today) == Retday(date))?TwoDigits(date.getHours())+ ":" + TwoDigits(date.getMinutes()):Retday(date) +" "+ TwoDigits(date.getHours())+ ":" + TwoDigits(date.getMinutes()) : null
                }</span>
              </Col>
            </Row>);
    }));
    // setting the state as list.
    setBookitemlist(list);
    }
    asyncFunction();
  },[user,selectedUser,updateInfo]);

  async function onSubmitUsername(e){
    e.preventDefault(); // prevent default logic.

    if(usernameInput.length > 0 && serverInput.length > 0 && displayNameInput.length > 0){
      if (usernameInput === user.username && serverInput === "localhost:5123"){
        setError("try to speak with yourself");
        return;
      }
      const response = await fetch("http://localhost:5123/api/contacts", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            "id" : usernameInput,"name":displayNameInput, "server" : serverInput
        }) // body data type must match "Content-Type" header
      });
    const response_external = await fetch("http://"+ selectedUser.server +"/api/invitations/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
          from: user.id,to:usernameInput,server: "localhost:5123"
      }) // body data type must match "Content-Type" header
    });
    if(response.ok == true && response_external.ok == true){
      // there isn't any user with given email so we can register him.
      setError("");
      // -- -- -- Load new contact data.
      var data = await response.json();
      setSelectedUser(data)
      setUsernameInput("");
      setButtonPopup(false);
    } else{
      setError("Failed to add new contact (Server issue).");
    }
    }else{
      setError("empty input in username field");
    }
  }
  return (
    <>
    <Container className="d-flex flex-column" style={{height:"100%", maxHeight:"100%", padding:"0"}}>
       {/* Row of input */}
      
      <Row className='heading'>
        <Col className='user-pic col-3'> 
          {(user !== null)?<img src={"profile-blue.jpg"}></img>:null }
        </Col>
        <Col className='col-6'>
        {(user !== null)? <h4 className="text-truncate" style={{textAlign:"justify",paddingTop:"1rem"}} > {user.displayName} </h4>: null }
        </Col>
        <Col className=' col-2 ' style={{margin:"auto", display:"block"}}>
        <Button variant='success' onClick={()=>{ setButtonPopup(true); }}>
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
       <Container style={{backgroundColor:"white", textAlign:"left",border:"1px solid #000000", height:"auto", padding:"4rem"}}>
         <Row>
           <h4>Add new contact:</h4>
         </Row>
          <Row style={{padding:"0.25rem"}}>
            <Form.Group controlId="formInputUsername">
              <Form.Control type="text" placeholder="Enter username ... " value={usernameInput} onChange={(e)=>{setUsernameInput(e.target.value)}}/>
            </Form.Group>
          </Row>
          <Row  style={{padding:"0.25rem"}}>
            <Form.Group controlId="formInputServer">
              <Form.Control type="text" placeholder="Enter Server ... " value={serverInput} onChange={(e)=>{setServerInput(e.target.value)}}/>
            </Form.Group>
          </Row>
          <Row  style={{padding:"0.25rem"}}>
            <Form.Group controlId="formInputDisplayName">
              <Form.Control type="text" placeholder="Enter nickname ... " value={displayNameInput} onChange={(e)=>{setDisplayNameInput(e.target.value)}}/>
            </Form.Group>
          </Row>
          <Row  style={{padding:"0.25rem"}}>
            <Button variant="success" type="submit">
              Add
            </Button>
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