import React from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea} from '@nextui-org/react';
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

      
    return (
      <div>
      <Sidebar/>
      <MaxContainer>
      <TitleContainer>
      <Text h3 > Transferir </Text>
      </TitleContainer>
      <form>
      <Container>    
      <TextContainer> 
       <ToContainer>
           <Text weight='bold'>Destinatario</Text>
           <Input contentClickable="true" contentRight={<ContactBlack onClick={()=>(alert("hola"))}/>} width="300px"/>
       </ToContainer>
       <MoneyContainer>
           <Text weight='bold'>Monto</Text>
           <Input width="300px" size="xlarge" />
       </MoneyContainer>
       <DetailContainer>
           <Text weight='bold'>Motivo</Text>
           <Textarea  maxlength="120" width="300px"/>
       </DetailContainer>   
       </TextContainer>
       <ButtonContainer>
       <Button rounded="Primary" color="#2CA1DE" size="small">Aceptar</Button>   
       </ButtonContainer>  
      </Container>
      </form>
      </MaxContainer>
      
      </div>
    )
}