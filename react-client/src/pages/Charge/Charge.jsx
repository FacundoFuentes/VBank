import React, { useEffect } from 'react'
import { Grid, Text, Container, Input, Button} from "@nextui-org/react"
import Sidebar from '../../components/Sidebars/Sidebar'
import { useState } from 'react'





export default function Charge() {
  const [input, setInput] = useState()
  const [btnValidate, setBtnValidate] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)




useEffect(() => {
 if(input > 0){
   setBtnValidate(false)
 }else{
   setBtnValidate(true)
 }

}, [input])


 const handleChange = (e)=>{
  
    setInput(
      e.target.value
     )
   
 }

const handleSubmit = ()=>{
  if(input > 0){

  }
}



  return (
    <div >
    <Sidebar/>
    <Container display="flex" direction="column" justify="center" alignItems="center" style={{height:"100vh",width:"100vh"}} >
      <Text style={{position:"relative", left:"-26%", marginBottom:"10px"}} h3>Charge</Text>  
    <Grid.Container gap={2} display="flex" justify="center"  alignItems="center" style={{backgroundColor:"#F6F6F6" , width:"60%", height:"200px",borderRadius:"10px"}}>
      <Grid >
          <Input value={ input }  onChange={handleChange}   min="0"   width="250px" labelPlaceholder ="To Many" type="number"></Input>
      </Grid>
        
      <Grid>
        <Button  onClick={handleSubmit}  loading={btnLoading} loaderType="gradient" disabled={btnValidate}   color="#2CA1DE" size="small" >ok</Button>
      </Grid>
    </Grid.Container>
    
    </Container>
    </div>       
  )
}
