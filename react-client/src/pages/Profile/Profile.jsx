import React,{ useState } from 'react'
import styled from "styled-components"
import Sidebar from '../../components/Sidebars/Sidebar';
import { getUserInfo} from "../../redux/reducers/userSlice";
import { useEffect } from "react";
import{useSelector, useDispatch} from "react-redux"
import {Link} from 'react-router-dom';
import { Text, Input, Modal } from '@nextui-org/react';
import { toast } from 'react-toastify';

const Container= styled.div`
padding: 100px;
text-align:center;
`
 const Information= styled.div`
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
const Edit = styled.a`
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

export default function Profile() {
  //me traigo la info del usuario
  const userInfo = useSelector(state => state.user.userInfo.info)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
    const fetchData = async() => {
      try{
   await dispatch(getUserInfo()).unwrap()
    } catch (error) {
      // handle error here
      
      if (error.data === "Unauthorized"){
        localStorage.removeItem('token')
        toast.error('Session expired, sign in again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          onClose: () => ( window.location.href = 'http://localhost:3000/'), 
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
       }
      }

    }
    fetchData()
  }, []);
  //---------------------Modal-----------------------------
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandlers = () => {
      setVisible(false);
    };
    const closeHandler = () => {
        setVisible(false);
    };
  //----------------------Validaciones---------------------------------






return (
    <>
    <Sidebar/>
    <Container>
    <Information>
    <H2> Profile </H2>   
    <In>
    <Info>
      <span>DNI:</span> 
     { userInfo &&
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
     {/*  <Edit>Edit</Edit> */}
    </Info>
    <Info>
    <span>Phone Number:</span> 
    {userInfo &&
    <User>{`${userInfo.phoneNumber}`} </User>}
     {/*  <Edit>Edit</Edit> */}
    </Info>
    <Info>
    <span>Adress:</span> 
    {userInfo &&
    <User>{`${userInfo.adress}`} </User>}
      <Edit>Edit</Edit> 
    </Info>
    <Info>
    <span>Zipcode:</span> 
    {userInfo &&
    <User>{`${userInfo.zipCode}`} </User>}
     <Edit auto shadow onClick={handler} >Edit</Edit> 
     <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
    >
        <Modal.Header>
            <Text id="modal-title" size={18}>
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
            <Button auto flat color="error" onClick={closeHandlers}>
            Back
            </Button>
            <Button auto onClick={closeHandler}>
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

