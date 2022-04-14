import { Container, Row, Col, Form, Button, Stack} from "react-bootstrap";



function Chat({user, selectedUser, messagesDB})
{
    /* There is access to:
        - current user that has login.
        - selected user that was selected from Chatbook.
        - messagesDB which we are using to get the messages between current user and selected user.

        with those, it should be fine to display the currect messages and add new messages.
        Notice: there are build-in functions for arrays, like find() and sort() functions, no need to reinvent the wheel here.
    */

    return (
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
                <Row> <p> Test Message</p></Row>
                <Row> <p> Test Message</p></Row>
                <Row> <p> Test Message</p></Row>
                <Row> <p> Test Message</p></Row>
                <Row> <p> Test Message</p></Row>
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
        );
}
export default Chat;