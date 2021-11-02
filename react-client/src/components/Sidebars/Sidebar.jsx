import React from 'react'
import { useDispatch } from 'react-redux'
import {Link } from "react-router-dom"
import styled from 'styled-components'
import Logos from "../../img/Logos.png"
import {Home} from "@styled-icons/boxicons-solid/Home"
import {DollarCircle} from "@styled-icons/boxicons-solid/DollarCircle"
import {Menu} from "@styled-icons/boxicons-regular/Menu"
import {UserCircle} from "@styled-icons/fa-solid/UserCircle"
import {LogOut} from "@styled-icons/boxicons-regular/LogOut"
import { Spacer } from "@nextui-org/react"
import { logoutUser } from '../../redux/reducers/userSlice'



const SideNav = styled.div`
  display:flex;
  position:fixed;
  overflow:hidden;
  flex-direction:column;
  align-items:center;
  flex-direction: flex-start;
  width:80px;
  height: 100%;
  background-color:#2CA1DE;
  margin:0px;
  padding:0px;
  `; 
const LogoMenu = styled.img`
  margin-top:30px;
  width:50px;
  height: 40px;
`;
const IconHome = styled(Home)`
  color: black;
  width:30px;
  height:30px;
`;
const IconMenu = styled(Menu)`
  color: black;
  width:30px;
  height:30px;
  display:none;
`;
const IconCashCoin = styled(DollarCircle)`
  color: black;
  width:35px;
  height:35px;
`;
const IconUser = styled(UserCircle)`
display:flex;
  position:relative;
  margin: 0;
  padding:0;
  top:200px;
  color: black;
  width:30px;
  height:30px;
`;
const IconLogOut = styled(LogOut)`
  display:flex;
  position:relative;
  margin: 0;
  padding:0;
  top:200px;
  color: black;
  width:30px;
  height:30px;
  cursor:pointer;
  &:hover{
    color:#222222;
  }
`;

export default function Sidebar() {
const dispatch = useDispatch()
const logOut = ()=> {
  dispatch(logoutUser())

}

  return (
    <div>
        <SideNav>
          
          <LogoMenu src={Logos} />
          <Spacer y={4}/>
          <IconMenu/>
          <Spacer y={6}/>
         <Link to="/home"><IconHome/></Link>
           <Spacer y={3}/>  
          <Link to="/home/transfer"> <IconCashCoin/></Link>
            <IconUser/>
            <Spacer y={2}/> 
         <Link to="/"><IconLogOut display="flex"  onClick={logOut}/></Link>   
        
        </SideNav>
    </div>
  )
}
