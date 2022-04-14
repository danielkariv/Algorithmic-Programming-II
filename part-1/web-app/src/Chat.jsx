import { Container, Row, Col, Form, Button, Stack} from "react-bootstrap";



function Chat()
{
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
           <Row style={{"flex-grow" : "1"}}>
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