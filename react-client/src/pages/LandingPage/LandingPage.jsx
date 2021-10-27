import React from 'react'
import Nav from '../../components/Nav/Nav'
import landing from '../../img/image-landing.png'
import styled from "styled-components"
import { Button, Text} from '@nextui-org/react';

import card from "../../img/Card-Landing.png"

const Container = styled.div`
display: flex;
justify-content:center;
padding: 80px 50px;
height: 100vh;
justify-content: center;
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
`

 const TextContainer = styled.div`
width: 600px;
`

const ImagenContainer = styled.div`
text-align: end;
width: 600px;
` 

const Card = styled.img`
width: 400px;

`
const TitleCard = styled.h3`
display: flex;
padding: 20px 50px;
justify-content: center;
align-items: center;
`
const ContainerCard = styled.div`
padding: 50px 100px;
display: flex;
justify-content: space-around;
height: 500px;
`
const TextCard= styled.div`
display: flex;
flex-direction: column;
justify-content:space-evenly;
text-align: center;
height: 230px;

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
         <Text h5> Financial Services for Millennial Customers </Text>
         </PText>
         <ButtonDiv>
         <Button size="large" rounded="Primary" color="#2CA1DE" > Get started </Button>
         </ButtonDiv>
       </TextContainer>
       <ImagenContainer>
         <img width="900px"  src={landing} alt= 'img not found'/>
       </ImagenContainer>
      </Container>   

        <TitleCard> <Text h3 size="60px">We are the light side of money</Text></TitleCard>
        <ContainerCard>
           <div> 
          <Card src={card} alt= 'img not found'/> 
           </div>
           <TextCard>
          <Text small color="#333"size="30px">Just an app and a card</Text>
          <Text h6 size="40px" color="#2CA1DE" >Simple. Transparent. And for free.</Text>
          </TextCard>
        </ContainerCard>

    </div>
  ) 
}
