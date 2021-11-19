import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { getUserInfo } from "../../redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import { Text, Input, Modal } from '@nextui-org/react';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {toast} from "react-toastify";

import { useTranslation } from "react-i18next";

const Container = styled.div`
padding: 150px;
text-align:center;
@media (max-width: 640px) {
margin: 0 ;
}
`
const Card = styled.div`
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
 @media (max-width: 640px) {
 display :"block";
width: 450px;
}
 `
const H2 = styled.h2`
font-weight: bold;
text-align:left;
padding-bottom: 15px;
background-color:#95BEFE;
padding-left: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
@media (max-width: 640px) {
 padding: 20px 20px 5px 20px;
 border: none;
}
`

const In = styled.div`
padding-left: 20px; 
padding-right: 5px;
@media (max-width: 640px) {
 padding: 5px 20px 20px 20px;
 background: transparent;
}
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
@media (max-width: 640px) {
 margin:0;
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
@media (max-width: 640px) {
 margin:0;
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
  }, [dispatch]);
  //---------------------Modales-----------------------------
  const [visible1, setVisible1] = useState(false);
  const handler1 = () => setVisible1(true);
  
  const closeHandler1 = () => {
    setVisible1(false) 
  };
  const [visible2, setVisible2] = useState(false);
  const handler2 = () => setVisible2(true);

  const closeHandler2 = () => {
    setVisible2(false);
  };

const { control, handleSubmit, formState: {errors} } = useForm();

const token = JSON.parse(localStorage.getItem("token")).data

console.log(token)

const onSubmit = (data,e) => {
  e.preventDefault();
  console.log(data);
  axios.post("http://localhost:3001/user/updateInfo", data,{headers:{'Authorization':'Bearer ' + token}})
  .then(res => {
    console.log(res);
    dispatch(getUserInfo())
  })
  .catch(err => {
    if (err.response.data.data === "Unauthorized"){
      localStorage.removeItem('token')
      toast.error(`Session expired, you must sign in again`, {
       position: "top-right",
       autoClose: 500,
       hideProgressBar: false,
       closeOnClick: true,
       onClose: () => ( window.location.href = 'http://localhost:3000/'  ), 
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
       }); 
      }
  })
}
 const { t, i18n } = useTranslation("global");

  return (
    <>
      <Container>
        <Card>
          <H2> {t("Prof.profile")}</H2>
          <In>
            <Info>
              <span>{t("Prof.birth")}</span>
              {userInfo &&
                <User> {`${userInfo.birthDate.slice(0, 10)}`} </User>}
            </Info>
            <Info>
              <span>DNI:</span>
              {userInfo &&
                <User> {`${userInfo.dni}`} </User>}
            </Info>
            <Info>
              <span>{t("Prof.firts")}</span>
              {userInfo &&
                <User>  {`${userInfo.firstname}`} </User>}
            </Info>
            <Info>
              <span>{t("Prof.lastn")}</span>
              {userInfo &&
                <User> {`${userInfo.lastname}`} </User>}
            </Info>
            <Info>
              <span>Email:</span>
              {userInfo &&
                <User>{`${userInfo.email}`} </User>}
            </Info>
            <Info>
              <span>{t("Prof.phone")}</span>
              {userInfo &&
                <User>{`${userInfo.phoneNumber}`} </User>}
            </Info>
              <Info>
                <span>{t("Prof.address")}</span>
               {userInfo &&  userInfo.adress === undefined ?       
                 <User> </User> :
                userInfo && 
                 <User>{`${userInfo.adress}`} </User> }
              {userInfo &&  userInfo.adress === undefined ?
             <Edit auto shadow onClick={handler1}>{t("Prof.add")}</Edit> :
             <Edit auto shadow onClick={handler1}>{t("Prof.edit")}</Edit> }
             <Modal
                  closeButton
                  aria-labelledby="modal-title"
                  open={visible1}
                  onClose={closeHandler1}>
                  <Modal.Header>
                    <Text id="modal-title" size={18}>
                    {t("Prof.change")}
                      <Text b size={18}>
                      {t("Prof.address")}
                      </Text>
                    </Text>
                  </Modal.Header>
                  <form onSubmit = {handleSubmit(onSubmit)} >
                  <Modal.Body>
                    <Controller
                      className="fields"
                      control={control}
                      defaultValue=""
                      name="adress"
                      rules={{ pattern: /^[0-9a-zA-Z \_]+$/i, required: true, maxLength: 35 }}
                      render={({ field }) => <Input className="input"       
                        underlined
                        labelPlaceholder={t("Prof.address")}
                        tipe="text"
                        color="#696262" {...field} />}
                    />
                    {errors?.adress?.type === "required" && <p className="error">{t("Prof.err")}</p>}
                    {errors?.adress?.type === "maxLength" && (
                      <p className="error">{t("Prof.err2")}</p>
                    )}
                    {errors?.adress?.type === "pattern" && (
                      <p className="error">{t("Prof.err")}</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                     type="submit"
                     auto onClick={closeHandler1}>
                      {t("Prof.save")}
                    </Button>
                  </Modal.Footer>
                  </form>
                </Modal>
              </Info>
              <Info>
                <span> {t("Prof.zip")}</span>
                {userInfo &&  userInfo.zipCode === undefined ?       
                 <User> </User> :
                 userInfo &&
                <User>{`${userInfo.zipCode}`} </User>}
               {userInfo &&  userInfo.zipCode === undefined ? 
                <Edit auto shadow onClick={handler2}>{t("Prof.add")} </Edit> :
                <Edit auto shadow onClick={handler2}>{t("Prof.edit")}</Edit>}
                <Modal
                  closeButton
                  aria-labelledby="modal"
                  open={visible2}
                  onClose={closeHandler2}>
                  <Modal.Header>
                    <Text id="modal" size={18}>
                    {t("Prof.change")}
                      <Text b size={18}>
                      {t("Prof.zip")}
                      </Text>
                    </Text>
                  </Modal.Header>
                  <form onSubmit = {handleSubmit(onSubmit)} >
                  <Modal.Body>
                    <Controller
                      className="field"
                      name="zipCode"
                      rules={{ required: true, pattern: /^([0-9])*$/i, maxLength: 5, minLength: 4 }}
                      control={control}
                      defaultValue=""
                      render={({ field }) => <Input className="input"
                        underlined
                        type="number"
                        labelPlaceholder={t("Prof.zip")}
                        color="#c5c5c5" {...field} />}
                    />
                    {errors.zipCode?.type === 'required' && <p className="error">{t("Prof.err-zip")}</p>}
                    {errors.zipCode?.type === 'pattern' && <p className="error">{t("Prof.err2-zip")} </p>}
                    {errors.zipCode?.type === 'maxLength' && <p className="error">{t("Prof.err3-zip")}</p>}
                    {errors.zipCode?.type === 'minLength' && <p className="error">{t("Prof.err4-zip")}</p>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="submit"
                      auto onClick={closeHandler2}>
                      {t("Prof.save")}
                    </Button>
                  </Modal.Footer>
                  </form>
                </Modal>
              </Info>
              <Info>
              <span>{t("Nav.Pass")}</span>
              <Link to='/home/changePassword'>
              <Edit >{t("Transfer.CH")}</Edit>
            </Link>
            </Info>
            <Link to='/home'>
              <Button>{t("Prof.back")}</Button>
            </Link>
          </In>
        </Card>
      </Container>
    </>
  )
}

