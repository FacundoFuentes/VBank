import React, { useState } from 'react'
import img from "../../img/logo.png"
import { Button, Container, Row, Spacer, Link as Links} from '@nextui-org/react';
import LoginModal from './Login/LoginModal';


export default function Nav() {
  
  return (
    <Container>
      <Spacer y={2}/>
      <Row justify="space-between" align="center">
        <img width="80px" src={img} alt="" />
        <div>
          <Row justify="center" align="center">
          <Links>About</Links>
          <Spacer x={1}/> 
       
        <LoginModal />
          </Row>
        </div>  
    </Row>
      <hr width="100%" color="#2CA1DE"/>
    </Container>
       
  )
}
