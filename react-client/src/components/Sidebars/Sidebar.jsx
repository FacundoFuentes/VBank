import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link } from "react-router-dom"
import styled from 'styled-components'
import Logos from "../../img/Logos.png"
import {Home} from "@styled-icons/boxicons-solid/Home"
import {DollarCircle} from "@styled-icons/boxicons-solid/DollarCircle"
import {Menu} from "@styled-icons/boxicons-regular/Menu"
import {UserCircle} from "@styled-icons/fa-solid/UserCircle"
import {LogOut} from "@styled-icons/boxicons-regular/LogOut"
import { Spacer, Text , Grid} from "@nextui-org/react"
import { logoutUser } from '../../redux/reducers/userSlice'
import { BuildingRetailMoney } from "@styled-icons/fluentui-system-filled/BuildingRetailMoney"


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
  
`;
const IconCashCoin = styled(DollarCircle)`
  color: black;
  width:35px;
  height:35px;
`;
const IconCharge = styled(BuildingRetailMoney)`
  color: black;
  width:35px;
  height:35px;
`;
const IconUser = styled(UserCircle)`
  display:flex;
  cursor:pointer;
  position:relative;
  margin: 0;
  padding:0;
  color: black;
  width:30px;
  height:30px;
`;
const IconLogOut = styled(LogOut)`
  display:flex;
  position:relative;
  margin: 0;
  padding:0;
  color: black;
  width:auto;
  height:30px;
  cursor:pointer;
  &:hover{
    color:#222222;
  }
`;
const ExtendNav = styled(SideNav)`
  width:200px;
  justify-content :flex-start;
  align-items:flex-start;
  padding-left:25px;

`;



export default function Sidebar() {
const dispatch = useDispatch()
const [menuExtend, SetMenuExtend] = useState()
const logOut = ()=> {
  dispatch(logoutUser())

}

  return (
    <>
    { !menuExtend ? 
      
        <SideNav>
          
          <LogoMenu src={Logos} />
          <Spacer y={7}/>
          <IconMenu style={{cursor:"pointer"}} onClick={()=>{SetMenuExtend(!menuExtend)}}/>
          <Spacer y={2}/>
         <Link to="/home"><IconHome/></Link>
           <Spacer y={2}/>  
          <Link to="/home/transfer"> <IconCashCoin/></Link>
          <Spacer y={2}/>
          <Link to="/home/charge"> <IconCharge/></Link>
          <Spacer y={2}/>
           <Link to="/user/profile"> <IconUser /> </Link>
            <Spacer y={2}/> 
         <Link to="/"><IconLogOut display="flex"  onClick={logOut}/></Link>   
        
        </SideNav>
      :
      <ExtendNav>


          <Grid.Container>
            <Spacer x={2}/>
          <Grid >
            <LogoMenu src={Logos} />
          </Grid>
          </Grid.Container>
        
          <Spacer y={6.50}/>

         
         
          <Grid.Container style={{cursor:'pointer'}} onClick={()=>{SetMenuExtend(!menuExtend)}} >
          <Grid>
          <IconMenu />
          </Grid>
            <Spacer x={1}/>
          <Grid>
           <Text >Menu</Text> 
          </Grid>
          </Grid.Container>
         

          <Spacer y={2}/>

          <Link to="/home"> 
          <Grid.Container alignItems="center" >
            <Grid  >
            <IconHome/> 
            </Grid>
            <Spacer x={1}/>
            <Grid>
            <Text color="black">Home</Text>
            </Grid>
          </Grid.Container>
            </Link>

          <Spacer y={2}/>

          <Link to="/home/transfer">
          <Grid.Container>
            <Grid>
            <IconCashCoin/>
            </Grid>
            <Spacer x={0.6}/>
            <Grid>
            <Text color="black">Transfer</Text>
            </Grid>
          </Grid.Container>
          </Link>
          <Spacer y={2}/>

          <Link to="/home/charge">
          <Grid.Container>
            <Grid>
            <IconCharge/>
            </Grid>
            <Spacer x={0.6}/>
            <Grid>
            <Text color="black">Charge</Text>
            </Grid>
          </Grid.Container>
          </Link>
          <Spacer y={2}/>



          <Link to="/user/profile">
          <Grid.Container style={{cursor:'pointer'}}>
            <Grid>
             <IconUser/>
            </Grid>
            <Spacer x={1}/>
            <Grid>
             <Text color="black">User</Text>
            </Grid>
          </Grid.Container>
          </Link>

          <Spacer y={2}/>

          <Grid.Container onClick={logOut} style={{cursor:'pointer'}}>
            <Grid>
            <Link to="/"><IconLogOut   /></Link>   
            </Grid>
            <Spacer x={1}/>
            <Grid >
            <Text   color="black">Log Out</Text>
            </Grid>
          </Grid.Container>

        
        </ExtendNav>
    }
    </>
    
  )
}
