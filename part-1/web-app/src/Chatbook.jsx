import { Container,Row,Form,Col,Button,ListGroup,ListGroupItem } from "react-bootstrap";

function Chatbook()
{
    return (
        <Container className="d-flex flex-column" style={{height:"100%"}}>
       {/* Row of input */}
       <Row>
       <Form>
         <Row>
           <Col className='col-8'>
             <Form.Group  controlId="formUsername">
               <Form.Control type="text" placeholder="username" />
             </Form.Group>
           </Col>
           <Col className='col-4'>
             <Button variant="primary" type="submit">
               Add
             </Button>
           </Col>
         </Row>
       </Form>
     </Row>
     {/* Row of list of chat memebers */}
     <Row style={{"flex-grow" : "1"}}>
       <ListGroup>
         {/* Row of a member */}
         <ListGroupItem>
           <Row>
             <Col>
               Image
             </Col>
             <Col>
               Username
             </Col>
           </Row>
         </ListGroupItem>

         <ListGroupItem>
           <Row>
             <Col>
               Image
             </Col>
             <Col>
               Second Username
             </Col>
           </Row>
         </ListGroupItem>
       </ListGroup>
     </Row>
     </Container>
    );
}
export default Chatbook;