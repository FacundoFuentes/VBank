import React from "react";
import styled from "styled-components"
import Sidebar from '../../components/Sidebars/Sidebar';



export default function Profile() {
  
  const Container= styled.div`
  padding: 100px;
  text-align:center;
 `
   const Information= styled.div`
   display: flex;
   flex-direction: column;
   max-width: 500px;  
   margin:0px auto;
   border-radius: 20px;
   position: center;
   border: 2px solid rgba(255, 255, 255, 0);
   padding: 10px;
   padding-bottom: 15px;
   box-shadow: 5px 5px 12px 5px rgba(0,0,0,0.24);
   -webkit-box-shadow: 5px 5px 12px 5px rgba(0,0,0,0.24);
   -moz-box-shadow: 5px 5px 12px 5px rgba(0,0,0,0.24);
   transition: all 0.25s;
   `
const In = styled.div`
padding-left: 20px; 
`

const H2 = styled.h2`
font-weight: bold;
text-align:left;
padding-bottom: 15px;
background-color:#2CA1DE;
padding-left: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`

const Info= styled.div`
 font-size: 20px;
  text-align: left;
  list-style:none;
  padding-bottom: 10px;
  padding-top: 13px;
  border-bottom: 1px solid rgb(139, 139, 139);
  font-weight: bold;
  &:hover{
    background-color: #e8eaeb53;
    border-radius: 2px;
  }
  `
const Button = styled.button`
display: flex;
position: relative;
margin-left: auto;
margin-top: 30px;
padding: 0.7em 2.4em;
font-size: 15px;
 border-radius: 20px;
 user-select: none;
 overflow: hidden;
 color: #2CA1DE;
 z-index: 1;
  border: none;
 font-weight: 500;
 cursor: pointer;
 &:hover {
  color: white;
  background-color: #2CA1DE;
 } 
`
const Edit = styled.a`
font-size: 15px;
float: right;
text-decoration: underline;
`
const User = styled.strong`
margin-left: 15px;
color: #8b8989;

`


  return (
    <>
    <Sidebar/>
    <Container>
    <Information>
    <H2> Pirulo Profile</H2>    
    <In>
    <Info>
      <span>DNI:</span> 
      <User> 35863311 </User>
      <Edit>Edit</Edit>
      </Info>
    <Info>
    <span>Firts Name:</span> 
    <User> Juan Domingo </User>
      <Edit>Edit</Edit>
    </Info>
    <Info>
    <span>Last Name:</span> 
    <User> Perales </User>
      <Edit>Edit</Edit>
   </Info>
    <Info> 
    <span>Password:</span> 
    <User> 1659 </User>
      <Edit>Edit</Edit>
    </Info>
    <Info>
    <span>Email:</span> 
    <User> jorge.elmono@mail.com </User>
      <Edit>Edit</Edit>
    </Info>
    <Button> Load
      <span></span>
    </Button>
    </In>
    </Information>
    </Container>
  </>
  );
}