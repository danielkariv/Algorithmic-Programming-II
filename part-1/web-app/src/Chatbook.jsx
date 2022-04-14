import { Container,Row,Form,Col,Button,ListGroup,ListGroupItem } from "react-bootstrap";

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
     <Row style={{"flexGrow" : "1"}}>
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