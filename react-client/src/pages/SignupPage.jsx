import React from 'react'

import register from "../img/register.jpg"
import styled from "styled-components"
import { Input, Button } from '@nextui-org/react';

import { useForm } from "react-hook-form";





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
/* 
  const { register, handleSubmit } = useForm(); */
    
  return (
      <Page>
        <FormContainer>
          <img src={register} alt="register" />

          <div className="form">
            <h2>Create Account</h2>
          <form>
            <div className="fields">
            <Input  className="input" underlined labelPlaceholder="Email" color="#f5f5f5" />
            </div>
            <div className="fields">
            <Input  underlined labelPlaceholder="DNI" color="#f5f5f5"  />
            </div>
            <div className="fields">
            <Input  underlined labelPlaceholder="Username" color="#f5f5f5"  />
            </div>
            <div className="fields">
            <Input.Password   underlined labelPlaceholder="Password" color="#f5f5f5"  type="password"
          />
            </div>
           
          
  
            
          </form>
          <Button type="submit"color="primary" auto>
        Create Account
    </Button>

          </div>

        </FormContainer>
  </Page>
  ) }
export default SignupPage
