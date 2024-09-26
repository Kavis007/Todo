import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import "./App.css"
import { IoMdLogIn } from "react-icons/io";
const Formtoapi = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  let nav = useNavigate()

  function handleSubmit() {
    const uname = "kaviskavi";
    const pass = "Kavi@13";
    if (username === uname && password === pass) {
      nav('/Todo')

    }
    else {

      alert('wrong')

    }
  }
  return (
    <Container fluid className='bodyy'>

        <Row style={{height:"20vh"}}>
          
          </Row>
          <Row style={{height:"60vh"}}>
            <Col lg={3} xs={12}>
            </Col>
            <Col lg={6} xs={12}>
            <Card className='card_class_glass'>
              <h1 className='txt'>API LOGIN</h1>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='name2' >Username:</Form.Label>
          <input type="text"  className='name1'  placeholder="Enter kaviskavi" onChange={(e) => setUsername(e.target.value)} />
          {/* <Form.Text className="text-muted">
          onChange={(e)=>setUsername(e.target.value)}
        </Form.Text> */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='name2'>Password:</Form.Label>
          <input  type="password"className='name1'  placeholder="Enter Kavi@13" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        
       
        <Button className='b1'variant="primary" type="submit" onClick={handleSubmit}>
          LogIn
          <IoMdLogIn/>
        </Button>
  
        </Card>
        </Col>
        <Col lg={3} xs={12}>
        </Col>
        </Row>
        <Row style={{height:"20vh"}}>

        </Row>
    </Container>
  )
}
// className='card_class_glass' style={{background:"transparent",width:"100%",height:"50vh",zIndex:"1", border:"none",borderRadius:"50px"}}

export default Formtoapi
