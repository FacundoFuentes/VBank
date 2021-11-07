
import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import register from "../../img/register.jpg"
import styled from "styled-components"
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from '@nextui-org/react';
import { registerUser } from '../../redux/reducers/userSlice';
import Nav from '../../components/Nav/Nav';




const Page = styled.div`
background-color: none;
min-height: 100vh;
display: grid;
position:fixed;
place-items: center; 
margin-top:50px;

`;

const FormContainer = styled.div`
position: relative;
top:-85px;
width: 85%;
background-color:white;
height: auto;
display: grid;
grid-template-columns: 1fr 1fr;
 img{
   width: 100%;
   min-height: 100%;
   object-fit: contain;
 }

.form {
  background-color: #95BEFE;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: #f5f5f5;
  height: auto;
  border-radius:10px;
  padding-top:25px;
  padding-bottom:5%;
}

form{
  padding-top: 60px;
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
   input{
     color:#f5f5f5;
   }
   span{
     color: #f5f5f5;
   }

   .error{
     margin:0;
     margin-top: 5px;
     color:#dc3545;
     font-size: 15px;
   }
  
  }
}

`;


const SignupPage = () => {
  
 const dispatch = useDispatch()

 const userState = useSelector(state => state.user);

 const {loggedInUser} =userState; // lo manejo en useEffect

 const {error} = useSelector(state => state.user.registerState)

 error ? console.error(error) : console.log("no error")


 const history= useHistory();

 useEffect(() => { 
  if (loggedInUser){
      //redirect con el hook useHistory
      history.push("/home"); //esto me lleva hacia esta ventana

  }
}, [loggedInUser,history])

  const { control, handleSubmit, formState: { errors }} = useForm();
   

  const onSubmit = (data) => {
   /*  console.log(data) */
      if (error) console.log("no se puede enviar")
      dispatch(registerUser(data));
      alert("User Created Succefully, Check Your EmailBox 📫")
      history.push("/")
      

  }
    
  return (
    <>
      <Nav/>
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
        rules={{ required: true, pattern: /^([0-9])*$/i , maxLength:9}}
        control={control}
        defaultValue=""
        render={({ field }) => <Input className="input"
      
        underlined 
       
        labelPlaceholder="DNI"
         color="#f5f5f5" {...field} />}
      />
      {errors.dni?.type === 'required' && <p className="error">DNI is required</p>}
      {errors.dni?.type === 'pattern' && <p className="error">Number characters only </p>}
      {errors.dni?.type === 'maxLength' && <p className="error"> DNI cannot be longer than 8 caracters or shorter than 7</p>}

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="firstName"
        control={control}
        defaultValue=""
        rules={ { pattern: /^[A-Za-z]+$/i, required:true, maxLength:32}}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="First Name"
         color="#f5f5f5" {...field} />}
      />
       {errors?.firstName?.type === "required" && <p className="error">This field is required</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p className="error">First name cannot exceed 32 characters</p>
      )}
      {errors?.firstName?.type === "pattern" && (
        <p className="error">Alphabetical characters only</p>
      )}
      
            </div>

            <div  className="fields">
          <Controller
        className="fields"
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ pattern: /^[A-Za-z]+$/i, required: true, maxLength:32 }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Last Name"
         color="#f5f5f5" {...field} />}
      />
       {errors?.lastName?.type === "required" && <p className="error">This field is required</p>}
      {errors?.lastName?.type === "maxLength" && (
        <p className="error">First name cannot exceed 32 characters</p>
      )}
      {errors?.lastName?.type === "pattern" && (
        <p className="error">Alphabetical characters only</p>
      )}

            </div>

            <div  className="fields">
          <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
       rules={{required:true}}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Username"
         color="#f5f5f5" {...field} />}
      />
       {errors?.username?.type === "required" && <p className="error">This field is required</p>}
      

            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="email"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Email"
         color="#f5f5f5" {...field} />}
      />
      {errors?.email?.type === "required" && <p className="error">This field is required</p>}
      {errors?.email?.type === "pattern" && (
        <p className="error">Please, enter a valid email</p>
      )}
            </div>
            <div  className="fields">
          <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        rules={{required:true}}
        render={({ field }) => <Input.Password
           underlined 
           labelPlaceholder="Password"
           
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
      />
     {errors?.password?.type === "required" && <p className="error">This field is required</p>}
     {error && <p className="error">{error}</p>}
            </div>
          <Button type="submit"color="primary" auto>
        Create Account
    </Button>

  
            
          </form>
          </div>

        </FormContainer>
  </Page>
  </>
  ) }
export default SignupPage
