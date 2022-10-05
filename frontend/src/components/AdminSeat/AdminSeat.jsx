import React from 'react'
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import './AdminSeat.css'


function AdminSeat () {
  const [seat, setSeat]=useState('')
  const [allSeat, setAllSeats]=useState([])
  const [company, setCompany]=useState([])
  const [selectSeat,setSelectSeat] = useState()
const[companyName,setcompanyName] = useState()
  const admininfo=localStorage.getItem("adminInfo");
  const navigate=useNavigate()
  useEffect(() => {
      if (!admininfo) {
   navigate('/admin') 
  }
  }, [navigate])
  

  const addSeat=async (e) => {
    e.preventDefault()
    try {
      const config={
        headers: {
          "content-type" :"application/json"
        },
      }
      const { data }=await axios.post('/admin/seats', { seat }, config)
      console.log('seats:', data)
     
      setSeat('')
      navigate('/seat')
    }catch (error) {
      console.log('error seat', error);
      setSeat('')
  }
  }
  const allocateSeat=async (seat) => {
   console.log('hkjh',seat);
    setShow(true);
    setSelectSeat(seat)
    const { data }=await axios.get(`/admin/process/${seat}`)
    setCompany(data)
    console.log('data:',data);
  }


  const getSeats=async () => {
    const { data }=await axios.get('/admin/seats')
   
    setAllSeats(data)
  }
  useEffect(() => {
    getSeats()
    
  }, [addSeat,applicationApprove])
  

  const [show, setShow] = useState(false);

  
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const applicationApprove=async() => {
  
    console.log('companyname',companyName)
    try {
       const config={
        headers: {
          "content-type" :"application/json"
        },
      }
     const {data} = await axios.patch(`/admin/seats`, { selectSeat, companyName }, config)
     console.log('update:',data);
      if (data) {
        setShow(false)
        getSeats()
        navigate('/seat')
      }
     
    }
    catch (error) {
      console.log('error',error);
    }
  
  }





  return (
    <>
      <Container>
        <Row className=' mt-4'>
          <Col md=' auto' >
            <div className='seat'>
        <Form onSubmit={addSeat}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Seat Number</Form.Label>
                <Form.Control name='Seat' value={seat}
                  onChange={(e)=>setSeat(e.target.value)}
                  type="name" placeholder="Seat Number" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
              </Button>
              </Form>
            </div>
            <div className='seatArrange'>
              {
                allSeat.map(value => <div onClick={()=>allocateSeat(value.seat)} className='block'>
                 <div>
                  <h5>{value.seat}</h5>
                  <br />
                    <p>{value.companyname? value.companyname:'allocate'}</p>
                    </div>
                </div>)
              }
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
               
                <Modal.Body>
                
                <select onChange={(e)=>setcompanyName(e.target.value)}>
                  <option>Choose  Company</option>
                  {company.map((obj) => 
                    <option value={obj.companyname}>{obj.companyname}</option>

                  ) }
               
                </select>
                
                
                </Modal.Body>
            
               


                
               
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>applicationApprove()}>
           Approve
          </Button>
        </Modal.Footer>
      </Modal>

          </div>

            </Col> 
        </Row>
       
        </Container>
      
     
    </>
  )
}

export default AdminSeat
