import React, {useState, useRef, useEffect}from 'react'
import styled from "styled-components"
import { Button, Text, Input, Modal, Card} from '@nextui-org/react';
import Sidebar from '../../components/Sidebars/Sidebar';
import axios from 'axios' 
import jwt from 'jsonwebtoken'
import success from "../../img/success.gif"
import {toast } from 'react-toastify';

const Container= styled.div`
display: flex;
justify-content: space-evenly;
flex-direction: column;
align-items: center;
height: 450px;
width: 700px;
background-color: #FFF;
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
margin-right:50px;

`

const TextContainer = styled.div`
`
const ToContainer= styled.div`
margin-top:10px;
margin-bottom: 10px;
padding: 5px;
`
const MoneyContainer = styled.div`
margin-top:10px;
margin-bottom: 10px;
padding: 5px;

`
const DetailContainer = styled.div `
margin-bottom: 0px;
margin-top: 30px;
padding: 5px;
`
const ButtonContainer = styled.div`
margin-left:155px;
padding: 5px;

`
const DivCheck = styled.div`
display: flex;
justify-content: center;
align-items: center;

`

export default function FixedTerm() {

    

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        setError('')
     
    }
    
    const defaultForm = {
      amount: 0,
      due: '',
      total:0
    }

    const [state, setState] = useState(defaultForm)
    const [error,setError] = useState('')
   const [status, setStatus] =useState(0)

  
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


      let date1 = new Date();  
      let date2 = new Date (state.due);  

      //calculate total number of seconds between two dates  
      var total_seconds = Math.abs(date2 - date1) / 1000;  

      //calculate days difference by dividing total seconds in a day  
      var days_difference = Math.floor (total_seconds / (60 * 60 * 24));  
       
      let monto=parseFloat(state.amount)

      let rate37 = ((37/365) * (days_difference))/100
      let rate37xdays= ((parseFloat(state.amount)*rate37))
      let rate37Total = (rate37xdays + monto).toFixed(2)


      
       useEffect(() => {
        
          setState({
            ...state,
            total:parseInt(rate37Total)
          })
      
      }, [rate37Total]) 
    
      const token = JSON.parse(localStorage.getItem("token")).data
      let {username} = jwt.decode(token)
      
      
       function handleSubmit(e){
        e.preventDefault()
        
        axios.post('http://localhost:3001/fixedDeposit/new', state, {headers:{'Authorization':'Bearer ' + token}})
        .then(response=> {
          console.log(response)
          setStatus(response.status)
          console.log(response.status)
          
          }).catch(error=>{
            setError(error.response.data.data)
            setStatus(error.response.data.status)
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
      <div>
      <Sidebar/>
       <MaxContainer>
        
        <TitleContainer>
          <Text h3 > Fixed Term Deposit </Text>
        </TitleContainer>
         
         <form >
      
      <Container>    
        <TextContainer> 
         
          <ToContainer>
            <Text >How much?</Text>
            <Input name="amount" type="number" min="1"  step="0.01" value={state.amount} contentClickable="true" onChange={(e)=>handleAmount(e)}  width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text>How long?</Text>
           <Input name="due" value={state.due} type="date"  width="300px" onChange={(e)=>handleChange(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
       <Card  color="#f3f3f3" bordered borderColor="#D8DBE2" >
           <Text  >Interest rate: </Text>
           <Text > from 30 to 365 days: TNA 37% </Text>
          
        </Card>
       
       </DetailContainer>   
 
       </TextContainer>
       
       <ButtonContainer>
       <Button disabled={!state.amount||!state.due} onClick={handler} rounded="Primary" color="#2CA1DE" size="small">Calculate</Button>   
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
 
           <Text  h3>Check before send!</Text>
         </Modal.Header>
        
        <Modal.Body> 
         
         <Text >How much: {` $ ${state.amount}`} </Text>
         <Text >Due date: {` ${state.due}`} </Text>
          <Text>Interest Rate: TNA 37%</Text>
         <Text >Period:{` ${days_difference} days`}</Text>
         <Text color="#2CA1DE" size="20px">Total credit: {`$ ${rate37Total}`} </Text>
         
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
            Confirm!
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

