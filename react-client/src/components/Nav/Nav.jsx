import React from 'react'
import {Link as LinkRouter}   from "react-router-dom"
import img from "../../img/logo.png"
import { Container, Row, Spacer, Link} from '@nextui-org/react';
import LoginModal from './Login/LoginModal';


export default function Nav() {


  return (  
    <Container>
      <Spacer y={2}/>
      <Row justify="space-between" align="center">
       <LinkRouter to="/"><img width="80px" src={img} alt="" /></LinkRouter> 
        <div>
          <Row justify="center" align="center">
          <Spacer x={1}/> 
          <LoginModal/>
          </Row>
        </div>  
    </Row>
      <hr width="100%" color="#2CA1DE"/>
    </Container>
       
  )
}
