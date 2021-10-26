import React from 'react'
import img from "../../img/logo.png"
import { Button, Container, Row, Spacer, Link} from '@nextui-org/react';


export default function Nav() {





  return (
    <Container>
      <Spacer y={2}/>
      <Row justify="space-between" align="center">
        <img width="80px" src={img} alt="" />
        <div>
          <Row justify="center" align="center">
          <Link>About</Link>
          <Spacer x={1}/> 
        <Button color="#2CA1DE" auto >
                Login
        </Button>
          </Row>
        </div>  
    </Row>
      <hr width="100%" color="#2CA1DE"/>
    </Container>
       
  )
}
