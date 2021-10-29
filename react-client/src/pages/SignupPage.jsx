import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";

import register from "../img/register.jpg"
import styled from "styled-components"
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from '@nextui-org/react';
import { logoutUser, registerUser } from '../redux/reducers/userSlice';







const Page= styled.div`
background-color: grey;
height: 100vh;
display: grid;
place-items: center;
`;

const FormContainer = styled.div`
width: 80%;
background-color:white;
height: 700px;
display: grid;
grid-template-columns: 1fr 1fr;

 img{
   width: 100%;
   height: 100%;
   object-fit: contain;
 }

.form {
  background-color: #95BEFE;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: #f5f5f5;
}

form{
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  width: 60%;

  .fields{
    margin-top:10px;
    margin-bottom:25px;

    &
    label{
      color: #f5f5f5;

    }
   .jsx-1698195688 { // lo saque del html 
     width: 100%;
     
   }
  
  }
}

`;



const BtnSubmit = styled.input``;




const SignupPage = () => {
  
 const dispatch = useDispatch()

 const userState = useSelector(state => state.user);

 const {loggedInUser} =userState; // lo manejo en useEffect

 const history= useHistory();

 useEffect(() => { 
  if (loggedInUser){
      //redirect con el hook useHistory
      history.push("/home"); //esto me lleva hacia esta ventana

  }
}, [loggedInUser])

  const { control, handleSubmit } = useForm();
  
 
  const onSubmit = (data) => {
    console.log(data)
      dispatch(registerUser(data));  

  }



  const LogOut = () => {
    dispatch(logoutUser())
  }
  
    
  return (
      <Page>
        <FormContainer>
          <img src={register} alt="register" />

          <div className="form">
            <h2>Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div  className="fields">
          <Controller
        className="fields"
        name="dni"
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="DNI"
         color="#f5f5f5" {...field} />}
      />
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="First Name"
         color="#f5f5f5" {...field} />}
      />
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Last Name"
         color="#f5f5f5" {...field} />}
      />
            </div>

            <div  className="fields">
          <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Username"
         color="#f5f5f5" {...field} />}
      />
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Email"
         color="#f5f5f5" {...field} />}
      />
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Input.Password   underlined labelPlaceholder="Password" color="#f5f5f5"  type="password" className="input"
        underlined 
        labelPlaceholder="Password"
         color="#f5f5f5" {...field} />}
      />
            </div>
          <Button type="submit"color="primary" auto>
        Create Account
    </Button>

  
            
          </form>
          <button onClick={LogOut} type="submit"color="primary" auto>
        Log Out
    </button> 

          </div>

        </FormContainer>
  </Page>
  ) }
export default SignupPage
/*  lastName,
            firstName,
            email,
            username,
            password: HashedPassword,
            dni */