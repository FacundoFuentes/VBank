import React, {useState, useRef} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Textarea, Modal, Grid, Spacer} from '@nextui-org/react';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import {toast } from 'react-toastify';
import jwt from 'jsonwebtoken'

const TitleContainer= styled.div` 
position:relative;
left:250px;
top:-50px;
@media screen and (max-width:1100px){
display:none
}
`
const Container = styled.div`
display:flex;
justify-content:center;
margin-top:150px;
margin-right:120px;
width:100%;
@media screen and (max-width:1100px){
margin-top:100px;
margin-left: 20%;


}
`
const MaxContainer=styled.div`
height: 500px;
margin-top: 25px;
@media screen and (max-width:1100px){
margin-top: 0px;

}
`
const PassContainer = styled.div`
margin-bottom: 8px;
padding:5px;
`;

const ButtonContainer = styled.div`
margin-left:155px;
padding:5px;
margin-top:15px;
`

const BoderShadow = styled.div`
  border:solid 0.5px #03030349;
  border-radius:10px;
  display:flex;
  justify-content :center;
  padding: 0px 30px;
  width:40%;
  overflow:hidden;
  -webkit-box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0,0,0,0);
  @media screen and (max-width:1100px){
    width:100%;
    box-shadow:none;
    -webkit-box-shadow:none;
    border:none;
  }
`;

const PText = styled.p`
font-size: 10px;
width:300px;
color:#dc3545;

`


export default function ChangePassword() {
    const {control, handleSubmit, formState: { errors, isValid }, getValues} = useForm({mode:"all"});
    
    const prevPassword = getValues('prevPassword')
    const newPassword = getValues('newPassword')
    const samePassword = getValues('samePassword')
    
    const defaultForm = {
        prevPassword: '',
        newPassword: '',

      }
  
      const [state, setState] = useState(defaultForm)


      const token = JSON.parse(localStorage.getItem("token")).data
     
      function onSubmit(data){
        setState(data)
        const miniState = {
            prevPassword: getValues('prevPassword'),
            newPassword: getValues('newPassword')
        }
        console.log(data)
        axios.post('http://localhost:3001/user/changePassword', miniState, {headers:{'Authorization':'Bearer ' + token}})
  .then(response=> {
   console.log(data)
   
   console.log(response.status)
  
   
   }).catch(error=>{
     
     
     if (error.response.data.data === "Unauthorized"){
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
  
    return (
        <div style={{display:"flex",justifyContent:"center"}}>

        <Container display="flex" justify="center" style={{marginTop:"150px", marginRight:"120px" }}>

        <TitleContainer>
           <Text h3 > Change your password </Text>
         </TitleContainer>
   
            
          <BoderShadow>
            <MaxContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
            
            <PassContainer>
            <Text> Type current password </Text>
            <Controller
        name="prevPassword"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/}}
        render={({ field }) => <Input.Password
           width="300px"
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
    />
          {/* {errors?.prevPassword?.type === "required" && <Text size="10px" margin="0px">This field is required</Text>}  */}

         {errors?.prevPassword?.type === "pattern" && <PText margin="0px">Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</PText>}
           
            </PassContainer>

            <PassContainer>
            <Text> Type new password </Text>
        <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/, validate: (value) => value !== getValues().prevPassword}}
        render={({ field }) => <Input.Password
           width="300px"
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
    />
         {/* {errors?.newPassword?.type === "required" && <PText>This field is required</PText>}  */}
        {errors?.newPassword?.type === "validate" && <PText className="error">New password should be different from previous password</PText>}
         {errors?.newPassword?.type === "pattern" && <PText className="error">Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</PText>}
      
           
            </PassContainer>

            <PassContainer className="fields">
            <Text> New password again!</Text>
            <Controller
        name="samePassword"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/,validate: (value) =>{ 
            const {newPassword} = getValues();
            return value === newPassword }}}
        render={({ field }) => <Input.Password
           width="300px"
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
      />
      {/* {errors?.samePassword?.type === "required" && <PText className="error">This field is required</PText>} */} 
     {errors?.samePassword?.type === "validate" && <PText className="error">Password does not match</PText>} 
      {errors?.samePassword?.type === "pattern" && <PText className="error">Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</PText>}
            </PassContainer>


        <ButtonContainer>
       <Button disabled={!prevPassword||!newPassword||!samePassword} rounded="Primary" color="#2CA1DE" size="small" type="submit"  >Change</Button>   

       </ButtonContainer> 

            </form>

            </MaxContainer>
          </BoderShadow>


          </Container>
        <Spacer y={3} />
      </div>
   
    )
}