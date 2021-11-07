import React, {useState} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea, Modal} from '@nextui-org/react';

import Sidebar from '../../components/Sidebars/Sidebar';
import axios from 'axios' 
import jwt from 'jsonwebtoken'
import {useHistory} from 'react-router-dom'

import success from "../../img/success.gif"
import ContactModal from '../../components/Contact/Contact';


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
.input-content.jsx-1792023292{
 
 width: 30px;
  padding-right: calc(8.0976pt);
  padding-left: 0;
 

}
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
/* const ContactBlack = styled(Contact)`
  color: black;
  height: 50px;
  
` */


const DivCheck = styled.div`
display: flex;
justify-content: center;
align-items: center;

`


const defaultForm = {
  to: '',
  amount: '',
  description: '',
  type: 'TRANSFER',
  cvv:''
}



export default function Transfer() {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
      setVisible(false);
      setError('');
   
  }


const myHistory = useHistory()

const [state, setState] = useState(defaultForm)

const [error,setError] = useState('')
console.log(error)

const [status, setStatus] =useState(0)
/* const [input, setInput] = useState(null)
console.log(input) */

function handleInputChange(e){

  setState({
    ...state,
    to: e.target.value
})
}

function handleChange(e){
  
  setState({
      ...state,
      [e.target.name]: e.target.value
  })
  
}



function handleAmount(e){
  setState({
      ...state,
      amount: parseInt(e.target.value)
  })
}

const token = JSON.parse(localStorage.getItem("token")).data
let {username} = jwt.decode(token)
console.log(username)

 function handleSubmit(e){
  e.preventDefault()
  
  axios.post('http://localhost:3001/transactions/new', state, {headers:{'Authorization':'Bearer ' + token}})
  .then(response=> {
   console.log(response)
   setStatus(response.status)
   console.log(response.status)
   
   }).catch(error=>{
     setError(error.response.data.error)
     setStatus(error.response.data.status)
      
   })
  }
  
  function HandleCloseSucces(e){
    e.preventDefault()
    setState(defaultForm)
    closeHandler()
  }


    return (
      <div>
      <Sidebar/>
       <MaxContainer>
        
        <TitleContainer>
          <Text h3 > Send Money </Text>
        </TitleContainer>
         
         <form >
      
      <Container>    
        <TextContainer> 
         
          <ToContainer>
            <Text weight='bold'>To Username</Text>
            <Input  className="field "name="to" value={state.to} contentClickable="true" onChange={(e)=>handleChange(e)} contentRight={<ContactModal handleInputChange={handleInputChange}/>} width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text weight='bold'>How much?</Text>
           <Input name="amount" value={state.amount} type="number" step="0.01" width="300px" size="xlarge" onChange={(e)=>handleAmount(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
           <Text weight='bold'>Note</Text>
           <Textarea name="description" value={state.description} maxlength="120" width="300px" onChange={(e)=>handleChange(e)}/>
       
       </DetailContainer>   
       
       </TextContainer>
       
       <ButtonContainer>
       <Button disabled={!state.to||!state.amount||!state.description} onClick={handler} rounded="Primary" color="#2CA1DE" size="small">Check</Button>   
       </ButtonContainer> 
       
       <Modal  
         preventClose 
         aria-labelledby="modal-title"
         open={visible}
         onClose={closeHandler}>
       {
         status !== 200 ?
         <>
         <Modal.Header>
           <Text h3>Check before send!</Text>
         </Modal.Header>
        
        <Modal.Body> 
         
         <Text>To Username: {` ${state.to}`} </Text>
         <Text>How much: {` ${state.amount}`} </Text>
         <Text>Note:{` ${state.description}`}</Text>
         <Input name="cvv" value={state.cvv} label="CVV:" type="text" width="60px" onChange={(e)=>handleChange(e)}></Input>
        </Modal.Body>
       
        <Modal.Footer>
           { error?.length > 1  ? 
            <>
            <Text color="red">{error}</Text>
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            Close
            </Button>
            <Button auto rounded="Primary" color="#2CA1DE" onClick={(e)=>handleSubmit(e)}>
            Ok!
            </Button>
            </>
            :
            <>
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            Close
            </Button>
            <Button auto rounded="Primary" color="#2CA1DE"  onClick={(e)=>handleSubmit(e)}>
            Ok!
            </Button>
            
            </>
            }
          </Modal.Footer>
          </>
          :
          <>
          <DivCheck>
          <img src={success} alt='loading gif' />
          </DivCheck>
          
          <Button  color="#2CA1DE" onClick={(e)=> HandleCloseSucces(e) }> Ok! </Button>
          </>
          }  
        </Modal> 
      
      </Container>
      
       </form>
      
      </MaxContainer>

      </div>
    )
}

