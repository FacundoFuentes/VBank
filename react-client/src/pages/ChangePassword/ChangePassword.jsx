import React, {useState, useRef} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea, Modal, Grid, Container, Spacer} from '@nextui-org/react';

const TitleContainer= styled.div` 
position:relative;
left:250px;
top:-50px;
@media screen and (max-width:1100px){
display:none
}
`
const MaxContainer=styled.div`
height: 420px;
`
const PassContainer = styled.div`
margin-top:15px;
margin-bottom: 5px;
padding:5px;
`;

const ButtonContainer = styled.div`
margin-left:155px;
padding:5px;
margin-top:15px;
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

export default function Transfer() {
    const defaultForm = {
        amount: 0,
        due: '',
        total:0
      }
  
      const [state, setState] = useState(defaultForm)

    return (
        <div style={{display:"flex",justifyContent:"center"}}>

        <Grid.Container display="flex" justify="center" style={{marginTop:"250px" }}>

        <TitleContainer>
           <Text h3 > Change your password </Text>
         </TitleContainer>
   
            
          <BoderShadow>
            <MaxContainer>
            <form >

            <PassContainer>
            <Text> Type your current password </Text>
            <Input.Password
            clearable
            type="password"
            width="300px"
        /> 
            </PassContainer>

            <PassContainer>
            <Text> Type your new password </Text>
            <Input.Password
            clearable
            type="password"
            width="300px"
        /> 
            </PassContainer>

            <PassContainer>
            <Text> New password again! </Text>
            <Input.Password
            clearable
            type="password"
            width="300px"
        /> 
            </PassContainer>

        <ButtonContainer>
       <Button  rounded="Primary" color="#2CA1DE" size="small">Change</Button>   
       </ButtonContainer> 

            </form>

            </MaxContainer>
          </BoderShadow>


          </Grid.Container>
        <Spacer y={3} />
      </div>
   
    )
}