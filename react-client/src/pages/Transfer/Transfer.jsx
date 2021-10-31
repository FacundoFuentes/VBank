import React, {useState} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea, Modal} from '@nextui-org/react';
import {Contact} from "@styled-icons/boxicons-solid/Contact"
import Sidebar from '../../components/Sidebars/Sidebar';


const Container= styled.div`
display: flex;
justify-content: space-evenly;
flex-direction: column;
align-items: center;
height: 450px;
width: 700px;
background-color: #F6F6F6;
border-radius: 10px;
`
const MaxContainer=styled.div`
height: 800px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const TitleContainer= styled.div`
margin-right: 280px;
margin-bottom: 10px;
`

const TextContainer = styled.div`
`
const ToContainer= styled.div`
margin-top:10px;

margin-bottom: 10px;
`
const MoneyContainer = styled.div`
margin-top:10px;
margin-bottom: 10px;
`
const DetailContainer = styled.div `
margin-bottom: 0px;
`
const ButtonContainer = styled.div`
margin-left:450px;

`
const ContactBlack = styled(Contact)`
  color: black;
  height: 50px;
  
`



export default function Transfer() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
      setVisible(false);
  }

  const [state, setState] = useState({
    to: '',
    amount: '',
    description: ''
})


function handleChange(e){
  setState({
      ...state,
      [e.target.name]: e.target.value
  })
  
}

function handleAmount(e){
  setState({
      ...state,
      amount: parseFloat(e.target.value)
  })
}

function handleDescription(e){
  setState({
      ...state,
      [e.target.description]: e.target.value
  })
  
}



    return (
      <div>
      <Sidebar/>
       <MaxContainer>
        
        <TitleContainer>
          <Text h3 > Send Money </Text>
        </TitleContainer>
         
         <form>
      
      <Container>    
        <TextContainer> 
         
          <ToContainer>
            <Text weight='bold'>To Username</Text>
            <Input name="to" contentClickable="true" contentRight={<ContactBlack onChange={(e)=>handleChange(e)}/>} width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text weight='bold'>How much?</Text>
           <Input name="amount" type="number" step="0.01" width="300px" size="xlarge" onChange={(e)=>handleChange(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
           <Text weight='bold'>Note</Text>
           <Textarea name="description" maxlength="120" width="300px" onChange={(e)=>handleChange(e)}/>
       
       </DetailContainer>   
       
       </TextContainer>
       
       <ButtonContainer>
       <Button onClick={handler} rounded="Primary" color="#2CA1DE" size="small">Check</Button>   
       </ButtonContainer> 

       <Modal  closeButton 
         aria-labelledby="modal-title"
         open={visible}
         onClose={closeHandler}>

         <Modal.Header>
           <Text h3>Check before send!</Text>
         </Modal.Header>
        
        <Modal.Body> 
         
         <Text>To Username: </Text>
         <Text>How much:</Text>
         <Text>Note:</Text>
        </Modal.Body>
       
        <Modal.Footer>
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            Close
            </Button>
            <Button auto rounded="Primary" color="#2CA1DE" onClick={closeHandler}>
            Ok!
            </Button>
        </Modal.Footer>

        </Modal> 
      
      </Container>
      
       </form>
      
      </MaxContainer>

      </div>
    )
}
