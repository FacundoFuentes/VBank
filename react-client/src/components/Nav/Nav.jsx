import React from 'react'
import {Link as LinkRouter}   from "react-router-dom"
import img from "../../img/logo.png"
import { Container, Row, Spacer, Link} from '@nextui-org/react';
import LoginModal from './Login/LoginModal';
import styled from 'styled-components';

import es from '../../img/spain.png';
import en from '../../img/united-kingdom.png';

import { useTranslation } from "react-i18next";

const Button = styled.button`
display: inline-block;
padding-left: 1rem;
background: transparent;
margin: 0;
border-radius: 20px;
border:transparent;
width: 60px;
height: 60px;
`

export default function Nav() {
  const { i18n } = useTranslation("global");
 
  return (  
    <Container>
      <Spacer y={2}/>
      <Row justify="space-between" align="center">
       <LinkRouter to="/"><img width="80px" src={img} alt="" /></LinkRouter> 
        <div>
          <Row justify="center" align="center">
          <Button onClick={() => i18n.changeLanguage("es") }><img src={es} alt=""/></Button>
					<Button onClick={() => i18n.changeLanguage("en")}><img src={en} alt=""/></Button>
          <Spacer x={1}/> 
          <LoginModal/>
          </Row>
        </div>  
    </Row>
      <hr width="100%" color="#2CA1DE"/>
    </Container>
       
  )
}
