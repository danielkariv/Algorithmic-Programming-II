
import './Chat.css';
import Popup from './Popup';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown} from "react-bootstrap";

function Retday(temp)
{
   var dd=temp.getDate();
   var mm= parseInt(temp.getMonth())+1;
   var yyyy= 2000+ parseInt(temp.getYear()) -100;
   var TodayIs=dd+"."+mm+"."+yyyy ;
   return TodayIs;
}

function TwoDigits(temp)
{
  temp=parseInt(temp);
  if (temp> 9)
        return temp;
    else
    return "0" +temp;

}

function Chat({user, selectedUser, messagesDB, updateInfo ,setUpdateInfo})
{
  //will be use in the popup
  const [buttonPopup,setButtonPopup]=useState(false);
  const [imgsrc,setImgsrc]=useState("");
  const [msgkind,setmsgkind]=useState("");
  const [msgitems,setMsgitems] = useState([]);
  const [messageInput,setMessageInput] = useState("");
  const [file,setFile] = useState("");
  const [fileType,setFileType] = useState("");
  const [fileButtonPopup,setFileButtonPopup] = useState(false);
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
  var msgitem =[];
  // useEffect is depends on user,selectedUser props, so it only updates when those two updates.
  useEffect(() => {    
    // edgecase, we already have user login and selected another user, we need to make that we treat only new chat selection.
   
    if(user !== null && selectedUser !== null)
      if (username == user.username && selectedname == selectedUser.username)
        return;
      else{
        username = user.username;
        selectedname = selectedUser.username;
      }
    else
      return;
    
    // next, we want to find all related messages from or to our user.
    var usermessagesDB=[];
    for ( var msg of messagesDB)
    {
      if (username.length !=0)
      if ((msg.from == username && msg.to ==selectedname)|| (msg.to == username && msg.from ==selectedname))
       usermessagesDB.push(msg);
    }
    // we sorting the messages based on date.
    var sortedusermessagesDB= usermessagesDB.sort(function(a,b){return new Date(b.timestamp)-new Date(a.timestamp)});
    // run on each messages and decide how to display it.
    setMsgitems(sortedusermessagesDB.map((bookitem,key) =>{
      var name= "";
      var Today= new Date();
      (bookitem.from === username)?name=bookitem.to :name=bookitem.from;
      var content="";
      var time;
      var cname="";
      var dname="";
      var path="";
      //cheking if the massege was sent
      (bookitem.from === username)?cname="message-main-sender" :cname="message-main-receiver";
      (bookitem.from === username)?dname="sender" :dname="receiver";
      if (msg){
        if(Retday(Today) == Retday(bookitem.timestamp))
          time = TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());
        else
         time =Retday(bookitem.timestamp) +" "+ TwoDigits(bookitem.timestamp.getHours())+ ":" + TwoDigits(bookitem.timestamp.getMinutes());;
      }
      // check which type of message, to handle his information correct.
      if (bookitem.type ==="msg")
      {
        content=bookitem.content;
      }
      else if (bookitem.type ==="img" ||bookitem.type ==="aud" ||bookitem.type ==="vid")
      {
        content= bookitem.content;
        path="\""+content+"\"";
      }
      // return the render of message by his type.
      return (
            <Row className='message-body' style={{height:"100 px"}} >
              <Col className={cname}>
                <div className={dname}>
                  <div className="message-text">
                    {(bookitem.type==="msg")? content : ((bookitem.type==="img")? <img className="pic" src={content} onClick={()=>{ setmsgkind("img");setButtonPopup(true); setImgsrc(content)}} ></img>: ((bookitem.type==="aud")? <audio controls> <source src={content} type="audio/mpeg"/></audio> :((bookitem.type==="vid")? <img className="pic" src={"http://localhost:3000/pic/vidpic.png"} onClick={()=>{ setmsgkind("vid");setButtonPopup(true); setImgsrc(content)}} ></img>: "") )) }
                  </div>
                  <span className="message-time pull-right">{time}</span>
                </div>
              </Col>
            </Row>);
    }));
  },[selectedUser,updateInfo]);
      
  function onSubmitMessage(e){
    e.preventDefault(); // prevent default logic.
    // if we loaded a file.
    if(file !== ""){
      if (file !== null){
      console.log(file);
      var type = "error"
      // accept="image/*,video/*,audio/*"
      if(file.type.split('/')[0] === "audio")
        type = "aud";
      else if (file.type.split('/')[0] === "video")
        type = "vid"
      else if  (file.type.split('/')[0] === "image")
        type = "img"
      var content = URL.createObjectURL(file);
      username = user.username;
      selectedname = selectedUser.username;
      
      var msg = {
        from:username,
        to:selectedname,
        type:type,
        content:content,
        timestamp:new Date(),
      }
      messagesDB.push(msg);
      // working, need to trigger an update ( using external prop).
      setUpdateInfo(!updateInfo);
      setFileButtonPopup(false);
      setFile("");
      }
    }
    else if (messageInput.length > 0){
      username = user.username;
      selectedname = selectedUser.username;
      
      var msg = {
        from:username,
        to:selectedname,
        type:"msg",
        content:messageInput,
        timestamp:new Date(),
      }
      messagesDB.push(msg);
      setMessageInput("");
      // working, need to trigger an update ( using external prop).
      setUpdateInfo(!updateInfo);
    }
  }
    return (
      <>
       <Container className="d-flex flex-column" style={{height:"100%",padding:"0px"}}>
            {/* Top bar, image and username with chat with.*/}
           <Row style={{minHeight:"3rem",maxHeight:"3rem"}}>
                <Col>
                {(selectedUser !== null)?<img className="user-pic" style={{maxHeight:"3rem"}} src={selectedUser.image}></img>:null }
                </Col>
                <Col>
                {(selectedUser !== null)?<h6 className=' text-truncate'>{selectedUser.displayName}</h6>:null }
                </Col>
           </Row>
           {/* The chat itself, need to be scrollable, and have rows inside with messages.
                TODO: make it strech to all avaiable height. */}
           <Row style={{"flexGrow" : "1"}}>
              <Container className='chat' >
                {msgitems}
              </Container>
           </Row>
           {/* Input bar for message, image, video or audio.*/}
           <Row style={{minHeight:"3rem",maxHeight:"3rem"}}>
            <Col>
              <Form onSubmit={onSubmitMessage}>
              {}
                <Row> 
                {/* 
                <Col className='col-2'>
                <Form.Group  controlId="formInputFile">
                  <Form.Control type='file' placeholder='' value={fileURL.value} accept="image/*,video/*,audio/*" onChange={(e)=>{setFileURL(URL.createObjectURL(e.target.files[0])); onSubmitMessage(e);} }/>
                </Form.Group>
                </Col>
                */}
                <Col className='col-2'>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    File
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e)=>{setFileButtonPopup(true); setFileType("img");}}>Image</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=>{setFileButtonPopup(true); setFileType("vid");}}>Video</Dropdown.Item>
                    <Dropdown.Item onClick={(e)=>{setFileButtonPopup(true); setFileType("aud");}}>Audio</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Col>
                <Col className='col-8'>
                  <Form.Group  controlId="formInputMessage">
                  <Form.Control type="text" placeholder="Enter text ... " value={messageInput} onChange={(e)=>{setMessageInput(e.target.value)}}/>
                  </Form.Group>
                </Col>
                  <Col className='col-2'>
                    <Button variant="primary" type="submit">
                    Send
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
           </Row>
       </Container>
        <Popup triggerd={buttonPopup} setTrigger={setButtonPopup} kind={msgkind} imgsrc={imgsrc}>
        </Popup>

        <Popup triggerd={fileButtonPopup} setTrigger={setFileButtonPopup} kind={""} imgsrc={""}>
          <Form onSubmit={onSubmitMessage} >
          <Container style={{backgroundColor:"white", textAlign:"left",border:"3px solid #000000", height:"150px"}}>
            <Row>
              <Form.Group  controlId="formInputFile">
                <Form.Control type='file' placeholder='' value={file.value} accept={(fileType === "img")? "image/*" : (fileType === "vid")? "video/*" : (fileType === "aud")? "audio/*" : "null" /* any="image/*,video/*,audio/*" */} onChange={(e)=>{setFile(e.target.files[0]); /*onSubmitMessage(e);*/} }/>
              </Form.Group>
            </Row>
              <Row>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Row>
            </Container>
          </Form>
          </Popup>
      </>
        );
}
export default Chat;