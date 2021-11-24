import React from 'react'
import Nav from '../../components/Nav/Nav'
import landing from '../../img/image-landing.png'
import styled from "styled-components"
import { Button, Text} from '@nextui-org/react';
import {Link} from "react-router-dom"

import card from "../../img/Card-Landing.png"


const Container = styled.div`
display: flex;
justify-content:center;
padding: 80px 50px;
/* height: 100vh; */
justify-content: center;

@media only screen and (max-width:1200px){
flex-direction: column-reverse;
align-items: center;
justify-content:center;
padding: 40px 25px;
}
`
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const PText = styled.div`
height: 250px;
display: flex;
flex-direction: column;
justify-content:space-around;
align-items: center;
text-align: center;
`

const ButtonDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
/* margin-top: 30px;
height: 100px; */
@media only screen and (max-width:600px){

margin-top: 20px;
}
`

 const TextContainer = styled.div`
width: 600px;
@media only screen and (max-width:600px){

width: 100%;
}

`

const ImagenContainer = styled.div`
text-align: end;
width: 600px;
@media only screen and (max-width:600px){

width: 100%;
}
` 

const Card = styled.img`
width: 400px;
@media only screen and (max-width:600px){

width: 100%;
}


`
const TitleCard = styled.h3`
display: flex;
padding: 20px 50px;
justify-content: center;
align-items: center;
margin-top: 50px;
@media only screen and (max-width:600px){

padding: 40px 25px;
}

`
const ContainerCard = styled.div`
padding: 50px 100px;
display: flex;
justify-content: space-around;
height: 500px;
@media only screen and (max-width:920px){
flex-direction: column;
justify-content:center;
align-items:center;
padding: 40px 25px;
div{
  margin-bottom: 15px;
}
}

`
const TextCard= styled.div`
display: flex;
flex-direction: column;
justify-content:space-evenly;
text-align: center;
height: 230px;
`
const Line = styled.div`
border: solid 1px #eaeaea;
width: 90%;
height: 1px;
display: flex;
margin: 0px auto;
`

export default function LandingPage() {
  return (
    <div>
      <Nav/>
      <Container>
       <TextContainer>
         <Title> <Text h1 size="60px">Welcome to VBank</Text> </Title>
         <PText>
         <Text h2 color="#2CA1DE"> We lose everything after this. Spend it (wisely). </Text>
         <Text h5 > Financial Services for Millennial Customers </Text>
         </PText>
         <ButtonDiv>
           <Link to="/user/signUp">
         <Button size="large" rounded="Primary" color="#2CA1DE" className="btn" > Get started </Button>
           </Link>
         </ButtonDiv>
       </TextContainer>
       <ImagenContainer className="imageContainer">
         <img width="900px"  src={landing} alt= 'img not found'/>
       </ImagenContainer>
      </Container>   
      <Line/>
    
        <TitleCard> <Text h3 size="60px">We are the light side of money</Text></TitleCard>
        <ContainerCard>
           <div> 
          <Card src={card} className="img" alt= 'img not found'/> 
           </div>
           <TextCard>
          <Text small color="#333"size="30px">Just an app and a card</Text>
          <Text h6 size="40px" color="#2CA1DE" >Simple. Transparent. And for free.</Text>
          </TextCard>
        </ContainerCard>
        
    </div>
  ) 
}
