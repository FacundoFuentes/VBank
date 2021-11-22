import React, { useState } from 'react'
import { useDispatch, useStore } from 'react-redux'
import {Link } from "react-router-dom"
import styled from 'styled-components'
import Logos from "../../img/Logos.png"
import {Home} from "@styled-icons/boxicons-solid/Home"
import {ArrowSwap} from "@styled-icons/fluentui-system-filled/ArrowSwap"
import {Menu} from "@styled-icons/boxicons-regular/Menu"
import {UserCircle} from "@styled-icons/fa-solid/UserCircle"
import {LogOut} from "@styled-icons/boxicons-regular/LogOut"
import { Spacer, Text , Grid, Col,Row} from "@nextui-org/react"
import { logoutUser } from '../../redux/reducers/userSlice'
import { CashCoin } from "@styled-icons/bootstrap/CashCoin"
import {PiggyBankFill} from "@styled-icons/bootstrap/PiggyBankFill"
import { useMediaQuery } from 'react-responsive';
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline"

const SideNav = styled.div`
  display:flex;
  position:fixed;
  overflow:hidden;
  flex-direction:column;
  align-items:center;
  flex-direction: flex-start;
  width:80px;
  height: 100vh;
  background-color:#95BEFE;
  margin:0px;
  padding:0px;
  transition: all 700ms;
  z-index:200;

  @media screen and (max-width: 1080px){
    width:0px;
  }
  
  &:hover{
    width:220px
  }

  `; 
const LogoMenu = styled.img`
  margin-top:30px;
  width:50px;
  height: 40px;
  `;



const IconHome = styled(Home)`
  color: #f5f5f5;
  width:30px;
  height:30px;
`;
const TextIcons = styled(Text)`
  color:white;
  display:flex;
  flex-wrap:nowrap;
  width:300px;
  color:#bdbdbd;
  &:hover{
    color:white;
  };
  
`;
const IconCashCoin = styled(ArrowSwap)`
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconCharge = styled(CashCoin)`
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconUser = styled(UserCircle)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:30px;
  height:30px;
`;
const IconPiggy = styled(PiggyBankFill)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:35px;
  height:35px;
`;
const IconLogOut = styled(LogOut)`
  
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: #f5f5f5;
  width:30px;
  height:30px;

`;
const LinkIcons = styled(Link)`
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  width:500px;


  &:hover {
    color:black;
    
  }

`;
const IconMenu = styled(Menu)`
  color: #cdcdcd;
  width:40px;
  height:40px;

`;
const IconClose = styled(CloseOutline)`
  color: #cdcdcd;
  width:40px;
  height:40px;
`;



const NavResponsive = styled(Grid.Container)`
  width:100vmax;
  padding:15px 30px; 
  position:relative;
  margin:50px;
  justify-content:space-between;
  z-index:500;
  display:none;
  margin-bottom:100px;

  #burger{

  }

`;
  
console.log(window.screen.width)

export default function Sidebar() {
const dispatch = useDispatch()
const [navOpen, setNavOpen] = useState(false)
const logOut = ()=> {
  dispatch(logoutUser())

}

  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })
  const isPortrait = useMediaQuery({ query: '(max-width: 480px)' })
  

  return (
  <>
   
        <SideNav style={{width:(navOpen && "300px")}}>
          
          <LogoMenu src={Logos} />
          <Spacer y={7}/>
          <Grid.Container >
            <Col offset={3.5}>

              <Row align="center" >
              <LinkIcons  to="/home"><IconHome/>
                <Spacer x={1.5}/>
                <TextIcons color="#f5f5f5;">Home</TextIcons>
              </LinkIcons>
              </Row>
           <Spacer y={2}/>  
            <Row class="iconos"  align="center">
             <LinkIcons to="/home/transfer"><IconCashCoin/>
             <Spacer x={1.2}/>
            <TextIcons color="#f5f5f5;">Transfer</TextIcons></LinkIcons>
            </Row>
          <Spacer y={2}/>
            <Row>
            <LinkIcons to="/home/charge"><IconCharge/>
            <Spacer x={1.2}/>
            <TextIcons color="#f5f5f5;">Charge</TextIcons></LinkIcons>
            </Row>
          <Spacer y={2}/>
            <Row>
             <LinkIcons to="/fixedTerm"><IconPiggy /> 
             <Spacer x={1.3}/>
              <TextIcons color="#f5f5f5;">Fixed Term</TextIcons></LinkIcons>
            </Row>
            <Spacer y={2}/> 
            <Row>
             <LinkIcons to="/user/profile"><IconUser /> 
             <Spacer x={1.4}/>
              <TextIcons color="#f5f5f5;">Profile</TextIcons></LinkIcons>
            </Row>
            <Spacer y={2}/> 
            <Row wrap="nowrap">
               <LinkIcons to="/"><IconLogOut  onClick={logOut}/> 
               <Spacer x={1.4}/>
               <TextIcons  color="#f5f5f5;"> Log Out</TextIcons></LinkIcons>
            </Row>

          </Col>
         
         </Grid.Container>
        </SideNav>

        {isTabletOrMobile && 
        
        <NavResponsive  >
            
                
        <Grid >
          
        </Grid>
        {navOpen ? ( <Grid id="burger">
          <IconClose onClick={()=>{setNavOpen(!navOpen)}} style={{marginRight:"20px"}} />
        </Grid>)
        :
          (<Grid id="burger">
          <IconMenu onClick={()=>{setNavOpen(!navOpen)}} style={{marginRight:"20px"}} />
        </Grid>
            )}
       

      </NavResponsive>
      }
        
      

    </>
  )
}
