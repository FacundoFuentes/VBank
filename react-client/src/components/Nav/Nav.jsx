import React from 'react'
import {Link as LinkRouter}   from "react-router-dom"
import img from "../../img/logo.png"
import { Container, Row, Spacer, Link} from '@nextui-org/react';
import LoginModal from './Login/LoginModal';


import es from '../../img/spain.png';
import en from '../../img/united-kingdom.png';

import { useTranslation } from "react-i18next";




export default function Nav() {
  const { t, i18n } = useTranslation("global");
 
  return (  
    <Container>
      <Spacer y={2}/>
      <Row justify="space-between" align="center">
       <LinkRouter to="/"><img width="80px" src={img} alt="" /></LinkRouter> 
        <div>
          <Row justify="center" align="center">
          <button onClick={() => i18n.changeLanguage("es") }><img src={es} alt=""/></button>
					<button onClick={() => i18n.changeLanguage("en")}><img src={en} alt=""/></button>
          <Spacer x={1}/> 
          <LoginModal/>
          </Row>
        </div>  
    </Row>
      <hr width="100%" color="#2CA1DE"/>
    </Container>
       
  )
}
