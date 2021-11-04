import React, {useState}from 'react'
import styled from "styled-components"
import { Button, Text, Input, Modal, Card} from '@nextui-org/react';
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
margin-top: 30px;
`
const ButtonContainer = styled.div`
margin-left:450px;

`

const defaultForm = {
    amount: '',
    days: ''
  }

export default function FixedTerm() {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        
     
    }

    const [state, setState] = useState(defaultForm)

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
      }


      let date1 = new Date();  
      let date2 = new Date (state.days);  

      //calculate total number of seconds between two dates  
      var total_seconds = Math.abs(date2 - date1) / 1000;  

      //calculate days difference by dividing total seconds in a day  
      var days_difference = Math.floor (total_seconds / (60 * 60 * 24));  
       
      let monto=parseFloat(state.amount)

      let rate37 = ((37/365) * (days_difference))/100
      let rate37xdays= ((parseFloat(state.amount)*rate37))
      let rate37Total = (rate37xdays + monto).toFixed(2)

      let rate40 = ((40/365) * (days_difference))/100
      let rate40xdays= ((parseFloat(state.amount)*rate40))
      let rate40Total = (rate40xdays + monto).toFixed(2) 

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
            <Text weight='bold'>How much?</Text>
            <Input name="amount" value={state.amount} contentClickable="true" onChange={(e)=>handleChange(e)}  width="300px"/>
         
          </ToContainer>
       
       <MoneyContainer>
           <Text weight='bold'>How long?</Text>
           <Input name="days" value={state.days} type="date" step="0.01" width="300px" onChange={(e)=>handleChange(e)} />
       
       </MoneyContainer>
       
       <DetailContainer>
       <Card  color="#2CA1DE" bordered borderColor="#D8DBE2" >
           <Text size="20px" weight='bold'>Interest rate: </Text>
           <Text > from 30 to 90 days: TNA 37% </Text>
           <Text > from 90 to 365 days: TNA 40% </Text>
        </Card>
       
       </DetailContainer>   
       
       </TextContainer>
       
       <ButtonContainer>
       <Button disabled={!state.amount||!state.days} onClick={handler} rounded="Primary" color="#2CA1DE" size="small">Calculate</Button>   
       </ButtonContainer> 
       
       <Modal  
         preventClose 
         aria-labelledby="modal-title"
         open={visible}
         onClose={closeHandler}>
 
         <Modal.Header>
           <Text  h3>Check before send!</Text>
         </Modal.Header>
        
        <Modal.Body> 
         
         <Text >How much: {` $ ${state.amount}`} </Text>
         <Text >Due date: {` ${state.days}`} </Text>
           <>
               {
                days_difference < 90 ? <Text > Interest rate: 37% </Text> : <Text > Interest rate: 40% </Text>
               }
           </>
         <Text >Period:{` ${days_difference} days`}</Text>
         {
             days_difference < 90 ?
              <Text color="#2CA1DE" size="20px">TOTAL CREDIT:  {`$ ${rate37Total}`} </Text>
              :
              <Text color="#2CA1DE" size="20px">TOTAL CREDIT:  {`$ ${rate40Total}`} </Text>
         }
         
        </Modal.Body>
       
        <Modal.Footer>
           
            <Button auto flat rounded="Primary" color="error" onClick={closeHandler}>
            Close
            </Button>
            <Button auto rounded="Primary" color="#2CA1DE" >
            Confirm!
            </Button>
           
          </Modal.Footer>

        </Modal> 
      
      </Container>
      
       </form>
      
      </MaxContainer>

      </div>
    )
}

