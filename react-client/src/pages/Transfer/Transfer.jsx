import React, {useState, useRef} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea, Modal} from '@nextui-org/react';

import Sidebar from '../../components/Sidebars/Sidebar';
import axios from 'axios' 
import jwt from 'jsonwebtoken'
import {useHistory} from 'react-router-dom'

import success from "../../img/success.gif"
import ContactModal from '../../components/Contact/Contact';
import {toast } from 'react-toastify';

const Container= styled.div`
display: flex;
justify-content: space-evenly;
flex-direction: column;
align-items: center;
height: 450px;
width:100%;
background-color: white;
border-radius: 10px;
padding:0px 30px

`
const MaxContainer=styled.div`
height: 600px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 50%;
padding:0px 30px
`
const TitleContainer= styled.div` 
  position:relative;
  left:130px;
  top:-50px;
  @media screen and (max-width:1100px){
  display:none
  }
`

const TextContainer = styled.div`
`
const ToContainer= styled.div`
margin-top:10px;
padding:5px;
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
padding:5px;
`;
const DetailContainer = styled.div `
margin-top: 10px;
margin-bottom: 10px;
padding:5px;
`
const BranchContainer = styled.div`
margin-top:10px;
margin-bottom:10px;
padding:5px;
`
const ButtonContainer = styled.div`
margin-left:155px;
padding: 5px;

`
const BoderShadow = styled.div`
  border:solid 0.5px #03030349;
  border-radius:10px;
  display:flex;
  justify-content :center;
  padding: 0px 30px;
  width:30%;
  overflow:hidden;
  -webkit-box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0);
  @media screen and (max-width:1100px){
    width:100%;
    box-shadow:none;
    -webkit-box-shadow:none;
    border:none;
  }
`;
/* const ContactBlack = styled(Contact)`
  color: black;
  height: 50px;
  
` */


const DivCheck = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
const Select = styled.select`
    color:#333;
    width: 300px;
    height: 35px;
    margin-bottom: 10px;
    border: none;
    background-color: #eaeaea;
    border-radius: 10px;
    padding:5px 10px;
`

const defaultForm = {
  to: '',
  amount: '',
  description: '',
  type: 'TRANSFER',
  cvv:'',
  branch:'',
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

const [status, setStatus] =useState(0)
/* const [input, setInput] = useState(null)
console.log(input) */
const [btnLoading, setBtnLoading] = useState(false)
const [btnValidate, setBtnValidate] = useState(true)

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
const handleBranch = () => {
  setState({
    ...state,
    branch: myHistory.current.value
  })
  
}



const token = JSON.parse(localStorage.getItem("token")).data


 function handleSubmit(e){
  e.preventDefault()
  
  axios.post('http://localhost:3001/transactions/new', state, {headers:{'Authorization':'Bearer ' + token}})
  .then(response=> {
   console.log(response)
   setStatus(response.status)
   console.log(response.status)
   setBtnLoading(false)
   
   }).catch(error=>{
     setError(error.response.data.error)
     setStatus(error.response.data.status)
     setBtnLoading(false)
     
     if (error.response.data.data === "Unauthorized"){
       localStorage.removeItem('token')
       toast.error(`Session expired, you must sign in again`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        onClose: () => ( window.location.href = 'http://localhost:3000/'  ), 
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        }); 
     }
    
   })
  }
  
  function HandleCloseSucces(e){
    e.preventDefault()
    setState(defaultForm)
    closeHandler()
  }


    return (
    
      <div style={{display:"flex",justifyContent:"center"}}>
      
        <TitleContainer>
          <Text h3 > Send Money </Text>
        </TitleContainer>
       <BoderShadow>
       <MaxContainer>
         
         <form >
      
      <Container>    
        <TextContainer> 
         
          <ToContainer>
            <Text weight='bold'>To Username</Text>
            <Input  className="field "name="to" value={state.to} contentClickable="true" onChange={(e)=>handleChange(e)} contentRight={<ContactModal handleInputChange={handleInputChange}/>} width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text >How much?</Text>
           <Input name="amount" value={state.amount} type="number" min="1" step="0.01" width="300px"  onChange={(e)=>handleAmount(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
           <Text >Note</Text>
           <Textarea name="description" value={state.description} maxlength="120" width="300px" onChange={(e)=>handleChange(e)}/>
 
       </DetailContainer>   
       <BranchContainer>
        <Text>Why?</Text>
          <Select ref={myHistory} onChange={handleBranch}>
          <option  value="Branch">select reason</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Games">Games</option>
                    <option value="Sport">Sport</option>
                    <option value="Tech">Tech</option>
                    <option value="Rent">Rent</option>
                    <option value="Miscellaneous">Miscellaneous</option>
          </Select>
 
       </BranchContainer>   
       
       </TextContainer>
       
       <ButtonContainer>
       <Button disabled={!state.to||!state.amount||!state.description}  onClick={handler} rounded="Primary" color="#2CA1DE" size="small">Check</Button>   
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
         <Text>How much?: {` $${state.amount}`} </Text>
         <Text>Note:{` ${state.description}`}</Text>
         <Text>Why?:{`  ${state.branch}`}</Text>
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
       </BoderShadow>

      </div>
    )
    
}

