import React from 'react'
import Nav from '../../components/Nav/Nav'
import landing from '../../img/image-landing.png'
import styled from "styled-components"
import { Button, Text, Spacer, Link} from '@nextui-org/react';
import card from "../../img/Card-Landing.png"

const Container = styled.div`
display: flex;
padding: 80px 50px;
height: 100vh;
`
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const PText = styled.div`
height: 300px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`

const ButtonDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 30px;
height: 100px;
`

 const TextContainer = styled.div`
width: 600px;
`

const ImagenContainer = styled.div`
text-align: end;
width: 700px;
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
`
export default function LandingPage() {
  return (
    <div>
      <Nav/>
      <Container>
       <TextContainer>
         <Title> <Text h1 size="60px">Welcome to VBank</Text> </Title>
         <PText>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
         </PText>
         <ButtonDiv>
         <Button color="#2CA1DE" > Get started </Button>
         </ButtonDiv>
       </TextContainer>
       <ImagenContainer>
         <img width="700px"  src={landing} alt= 'img not found'/>
       </ImagenContainer>
      </Container>   

        <TitleCard> <Text h3 size="50px">Lorem Ipsum </Text></TitleCard>
        <ContainerCard>
          <Card src={card} alt= 'img not found'/>
          <p>
           An app and a card
           Mastercard to manage
          your money much easier</p>
        </ContainerCard>

    </div>
  ) 
}