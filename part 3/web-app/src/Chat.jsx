
import './Chat.css';
import Popup from './Popup';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown} from "react-bootstrap";

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


function Chat({Connection,user, selectedUser, updateInfo ,setUpdateInfo,track})
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
  const [recordingButtonState, setrecordingButtonState] = useState(false);

  var username="";
  var selectedname="";
  var msgitem =[];
  // useEffect is depends on user,selectedUser props, so it only updates when those two updates.
  useEffect(() => {    
    // edgecase, we already have user login and selected another user, we need to make that we treat only new chat selection.
    async function asyncFunction(){
    if(user !== null && selectedUser !== null)
      if (username == user.username && selectedname == selectedUser.id)
        return;
      else{
        username = user.username;
        selectedname = selectedUser.id;
      }
    else
      return;

    // next, we want to find all related messages from or to our user.
    const response = await fetch("http://localhost:5123/api/contacts/"+selectedname+"/messages", {
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
    var messages= await response.json()
   // console.log (messages);
    // we sorting the messages based on date.  (TODO: it is printing them flipped [newest message at the top -> need to be bottom])
    var messages= messages.sort(function(a,b){return new Date(b.created)-new Date(a.created)});
    // run on each messages and decide how to display it.
    setMsgitems(messages.map((bookitem,key) =>{
      var Today= new Date();
      var date
      if (bookitem.lastdate) date = new Date(bookitem.lastdate) 
      else date = null
      //console.log(bookitem)
      // return the render of message by his type.
      return (
            <Row className='message-body' key={key} style={{height:"100 px"}} >
              <Col className={(bookitem.sent)?"message-main-sender" :"message-main-receiver"}>
                <div className={(bookitem.sent)?"sender" :"receiver"}>
                  <div className="message-text">
                    {bookitem.content}
                  </div>
                  <span className="message-time pull-right">{(date)? (Retday(Today) == Retday(date))?TwoDigits(date.getHours())+ ":" + TwoDigits(date.getMinutes()):Retday(date) +" "+ TwoDigits(date.getHours())+ ":" + TwoDigits(date.getMinutes()) : null}</span>
                </div>
              </Col>
            </Row>);
    }));
  }
    asyncFunction();

  },[selectedUser,updateInfo,track]);
      
  async function onSubmitMessage(e){
    e.preventDefault(); // prevent default logic.
    if(username === null || selectedUser === null){
      console.log("user isn't selected a chat member to speak yet, so no messages can't be passed.")
      return;
    }
    // if we loaded a file.
    if(file !== ""){
      if (file !== null){
      var type = "error"
      // accept="image/*,video/*,audio/*"
      if(file.type.split('/')[0] === "audio")
        type = "aud";
      else if (file.type.split('/')[0] === "video")
        type = "vid"
      else if  (file.type.split('/')[0] === "image")
        type = "img"
      
      var content = URL.createObjectURL(file);
      //console.log(content);
      username = user.username;
      selectedname = selectedUser.id;
      
      var msg = {
        from:username,
        to:selectedname,
        type:type,
        content:content,
        timestamp:new Date(),
      }
      // working, need to trigger an update ( using external prop).
      setFileButtonPopup(false);
      setFile("");
      setUpdateInfo(!updateInfo);
      }
    }
    else if (messageInput.length > 0){
      username = user.username;
      selectedname = selectedUser.id;
      
      var msg = {
        content:messageInput,
      }
      const response = await fetch("http://localhost:5123/api/contacts/"+selectedname+"/messages", {
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
            "content":messageInput
        }) // body data type must match "Content-Type" header
      });
      var serverurl = selectedUser.server;
      if(serverurl === "10.0.2.2:5123")
        serverurl = "localhost:5123";
      const response_external = await fetch("http://"+ serverurl +"/api/transfer", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            from: username,to:selectedname,content:messageInput
        }) // body data type must match "Content-Type" header
      });
            
      if(response.ok == true && response_external.ok == true){
        setMessageInput("");
        // working, need to trigger an update ( using external prop).
        try
        {
        await  Connection.invoke("Update",selectedUser.id);
        }
        catch(e)
        {
          
        }
        setUpdateInfo(!updateInfo);
      } else{
        // we failed to send message
        // it could be failed fetch from our server or external. From external I can't fix, and in ours I don't have the ID of message.
        console.log("failed to send message.");
      }

    }
  }
  useEffect(()=>{
    setFile("");
  },[fileButtonPopup]);

  const [mediaRecorder,setMediaRecorder] = useState(null);

  let chunks = [];
  function onRecordClick(e){
    if(recordingButtonState === false){
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia (
           // constraints - only audio needed for this app
           {
              audio: true
           })
     
           // Success callback
           .then(function(stream) {
            var recorder = new MediaRecorder(stream);
            

            recorder.ondataavailable = function(e) {
              chunks.push(e.data);
            }

            recorder.onstop = function(e) {
              console.log("recorder stopped");

              var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
              chunks = [];
              setFile(blob);
            }
            
            recorder.start();
            setMediaRecorder(recorder);
           })
     
           // Error callback
           .catch(function(err) {
              console.log('The following getUserMedia error occurred: ' + err);
           }
        );
     } else {
        
        console.log('getUserMedia not supported on your browser!');
     }   
      setrecordingButtonState(true);
    }else{
      if(mediaRecorder !== null)
        mediaRecorder.stop();
      else
        console.log("can't stop recording as mediaRecorder doesn't exist");
      setrecordingButtonState(false);
    }
  }
  
    return (
      <>
       <Container  className="d-flex flex-column" style={{height:"100%",padding:"0px",margin:"0px"}}>
            {/* Top bar, image and username with chat with.*/}
           <Row style={{minHeight:"3rem",maxHeight:"3rem",alignSelf:"center"}}>
            <Col>
            
              {(selectedUser !== null)?<img style={{width:"2.5rem", height:"2.5rem", borderRadius:"50%", padding:"0.25rem",margin:"0"}} src={"profile-blue.jpg"}></img>:null }
              {(selectedUser !== null)?<b className='text-truncate' style={{padding:"0.5rem",margin:"0",textAlign:"left"}}>{selectedUser.name}</b>:null }
            </Col>
            </Row>
           {/* The chat itself, need to be scrollable, and have rows inside with messages.
                TODO: make it strech to all avaiable height. */}
           <Row style={{"flexGrow" : "1", margin:"0px"}}>
              <Container className='chat' >
                {msgitems}
              </Container>
           </Row>
           {/* Input bar for message, image, video or audio.*/}
           <Row style={{minHeight:"3rem",maxHeight:"3rem"}}>
            <Col>
              <Form onSubmit={onSubmitMessage}>
              {}
                <Row style={{paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"0.25rem"}}> 
                {/* 
                <Col className='col-2'>
                <Form.Group  controlId="formInputFile">
                  <Form.Control type='file' placeholder='' value={fileURL.value} accept="image/*,video/*,audio/*" onChange={(e)=>{setFileURL(URL.createObjectURL(e.target.files[0])); onSubmitMessage(e);} }/>
                </Form.Group>
                </Col>
                */}
                <Col className='col-2' style={{padding:"0px"}}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={true}>
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
                  <Col className='col-2' style={{padding:"0px"}}>
                    <Button variant="success" type="submit">
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

        <Popup triggerd={fileButtonPopup} setTrigger={setFileButtonPopup} kind={""} imgsrc={""} >
          <Form onSubmit={onSubmitMessage} >
          <Container style={{backgroundColor:"white", textAlign:"left",border:"1px solid #000000", height:"auto", padding:"4rem"}}>
            <Row>
                {
                  (fileType === "img" || fileType === "vid")? 
                  <Form.Group  controlId="formInputFile">
                    <Form.Control type='file' placeholder='' value={file.value} accept={(fileType === "img")? "image/*" : (fileType === "vid")? "video/*" : (fileType === "aud")? "audio/*" : "null" /* any="image/*,video/*,audio/*" */} onChange={(e)=>{setFile(e.target.files[0]); /*onSubmitMessage(e);*/} }/>
                  </Form.Group> :
                  (fileType === "aud")?
                  <>
                    <Button variant="primary" onClick={onRecordClick}> {(recordingButtonState)? "Stop" : "Record"}</Button>
                  </> : null
                }
              
            </Row>
            <Row style={{padding:"0.5rem"}}>
            </Row>
              <Row>
              <Button variant="success" type="submit">
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