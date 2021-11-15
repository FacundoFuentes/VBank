import React, { useState } from 'react';
import styled from "styled-components";
import { getUserInfo } from "../../redux/reducers/userSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import { Text, Input, Modal } from '@nextui-org/react';



const Container = styled.div`
padding: 50px;
text-align:center;
`
const Information = styled.div`
 display: flex;
 flex-direction: column;
 max-width: 700px;  
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
background-color:#95BEFE;
padding-left: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`
const Info = styled.div`
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
const Edit = styled.a`
color:#95BEFE;
font-size: 18px;
float: right;
text-decoration: underline;
`
const User = styled.strong`
margin-left: 15px;
color: #8b8989;
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
color: #95BEFE;
z-index: 1;
border: none;
font-weight: 500;
cursor: pointer;
&:hover {
color: white;
background-color: #95BEFE;
} 
`


export default function Profile() {
  //me traigo la info del usuario
  const userInfo = useSelector(state => state.user.userInfo.info)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, []);
  //---------------------Modales-----------------------------
  const [visible1, setVisible1] = useState(false);
  const handler1 = () => setVisible1(true);
  const closeHandlers1 = () => {
    setVisible1(false);
  };
  
  
  const closeHandler1 = () => {
    setVisible2(false);
  };
  const [visible2, setVisible2] = useState(false);
  const handler2 = () => setVisible2(true);
  const closeHandlers2 = () => {
    setVisible2(false);
  };
  const closeHandler2 = () => {
    setVisible2(false);
  };
//----------------------Validaciones-----------------------------------




//---------------------------------------------------------------------

  return (
    <>
      <Container>
        <Information>
          <H2> Profile </H2>
          <In>
            <Info>
              <span>Birthdate:</span>
              {userInfo &&
                <User> {`${userInfo.birthDate}`} </User>}
            </Info>
            <Info>
              <span>DNI:</span>
              {userInfo &&
                <User> {`${userInfo.dni}`} </User>}
            </Info>
            <Info>
              <span>Firts Name:</span>
              {userInfo &&
                <User>  {`${userInfo.firstname}`} </User>}
            </Info>
            <Info>
              <span>Last Name:</span>
              {userInfo &&
                <User> {`${userInfo.lastname}`} </User>}
            </Info>
            <Info>
              <span>Email:</span>
              {userInfo &&
                <User>{`${userInfo.email}`} </User>}
            </Info>
            <Info>
              <span>Phone Number:</span>
              {userInfo &&
                <User>{`${userInfo.phoneNumber}`} </User>}
            </Info>
            <Info>
              <span>Adress:</span>
              <User> </User>
              <Edit auto shadow onClick={handler1}>+Add </Edit>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible1}
                onClose={closeHandler1}>
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    change your..
                    <Text b size={18}>
                      Adress
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="large"
                    placeholder="Adress..."
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onClick={closeHandlers1}>
                    Back
                  </Button>
                  <Button 
                  auto onClick={closeHandler1}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </Info>
            <Info>
              <span>Zipcode:</span>
              <User> </User>
              <Edit auto shadow onClick={handler2} >+Add</Edit>
              <Modal
                closeButton
                aria-labelledby="modal"
                open={visible2}
                onClose={closeHandler2}>
                <Modal.Header>
                  <Text id="modal" size={18}>
                    change your..
                    <Text b size={18}>
                      Zipcode
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="large"
                    placeholder="Zipcode..."
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onClick={closeHandlers2}>
                    Back
                  </Button>
                  <Button 
                  auto onClick={closeHandler2}>
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </Info>
            <Link to='/home'>
              <Button> Back </Button>
            </Link>
          </In>
        </Information>
      </Container>
    </>
  )
}

