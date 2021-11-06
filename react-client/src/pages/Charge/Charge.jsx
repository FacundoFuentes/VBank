
import React, { useEffect } from 'react'
import { Grid, Text, Container, Input, Button, Modal} from "@nextui-org/react"
import Sidebar from '../../components/Sidebars/Sidebar'
import { useState } from 'react'
import img from "../../img/Charge-Success.gif"
import axios from 'axios'
import jwt from 'jsonwebtoken'











export default function Charge() {
  const token = JSON.parse(localStorage.getItem("token")).data
  let {username} = jwt.decode(token)

  const form = {
    username: username,
    charge:""
  }


  const [input, setInput] = useState(form)
  const [btnValidate, setBtnValidate] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
      setVisible(false);
  };

  

useEffect(() => {
 if(input.charge > 0){
   setBtnValidate(false)
 }else{
   setBtnValidate(true)
 }

}, [input])

const handleChange = (e)=>{
  setInput({
    ...input,
    charge: parseInt(e.target.value)
  })
  
}


const handleSubmit = ()=>{
  setBtnLoading(true)
  if(input.charge > 0){
    axios.patch('http://localhost:3001/user/charge', input, {headers:{'Authorization':'Bearer ' + token}})
  .then(response=> {
   console.log(response)
   setInput(form)
   setVisible(true)
   setBtnLoading(false)
   }).catch(error=>{
  setBtnLoading(false)
     console.log(error)
   })
  }
}



  return (
    <div >
    <Sidebar/>
    <Container display="flex" direction="column" justify="center" alignItems="center" style={{height:"100vh",width:"100vh"}} >
      <Text style={{position:"relative", left:"-26%", marginBottom:"10px"}} h3>Charge</Text>  
    <Grid.Container gap={2} display="flex" justify="center"  alignItems="center" style={{backgroundColor:"#F6F6F6" , width:"60%", height:"200px",borderRadius:"10px"}}>
      <Grid >
          <Input value={ input.charge }  onChange={handleChange}   min="0"   width="250px" labelPlaceholder ="To Many" type="number"></Input>
      </Grid>
        
      <Grid>
        <Button  onClick={handleSubmit}  loading={btnLoading} loaderType="gradient" disabled={btnValidate}   color="#2CA1DE" size="small" >ok</Button>
      </Grid>
        <Modal
        
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
          <Modal.Header>
              <Text color="green" h2>Success</Text>
          </Modal.Header>
          <Modal.Body display="flex" justify="center">
              <img style={{width:"150px",position:"relative",left:"100px"}} src={img} alt="Loading" />
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={closeHandler} size="small">ok</Button>
          </Modal.Footer>
        </Modal>
    </Grid.Container>
    </Container>
    </div>       
  )
}

