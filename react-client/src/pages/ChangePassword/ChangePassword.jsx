import React, {useState} from 'react'
import styled from "styled-components"
import { Button, Text, Input, Grid, Spacer} from '@nextui-org/react';
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

const TitleContainer= styled.div` 
position:relative;
left:250px;
top:-50px;
@media screen and (max-width:1100px){
display:none
}
`
const MaxContainer=styled.div`
height: 300px;
`
const PassContainer = styled.div`
margin-top:15px;
margin-bottom: 5px;
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
  width:30%;
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

export default function Transfer() {
    const {control, handleSubmit, formState: { errors, isValid }} = useForm({mode:"all"});
    const defaultForm = {
        amouprevPasswordnt: '',
        newPassword:'',

      }
  
      const [state, setState] = useState(defaultForm)

      function handleChange(e){
  
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        
      }

const { t, i18n } = useTranslation("global");
    
return (
        <div style={{display:"flex",justifyContent:"center"}}>

        <Grid.Container display="flex" justify="center" style={{marginTop:"250px" }}>

        <TitleContainer>
           <Text h3 >{t("Transfer.CYP")} </Text>
         </TitleContainer>
          <BoderShadow>
            <MaxContainer>
            <useForm >

            <PassContainer>
            <Text>{t("Transfer.PS")} </Text>
            <Input.Password
            clearable
            type="password"
            width="300px"
            name="prevPassword"
            onChange={(e)=>handleChange(e)}
        /> 
            </PassContainer>

            <PassContainer>
            <Text>{t("Transfer.PS2")}</Text>
        <Controller
        onChange={(e)=>handleChange(e)}
        name="newPassword"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/}}
        render={({ field }) => <Input.Password
           width="300px"
             type="password" 
             className="input"
         color="#f5f5f5" {...field} />}
      />
     {errors?.password?.type === "required" && <p className="error">{t("Profile.err")}</p>}

     {errors?.password?.type === "pattern" && <p className="error">{t("Sing.err3")}</p>}
           
            </PassContainer>


        <ButtonContainer>
       <Button  rounded="Primary" color="#2CA1DE" size="small">{t("Transfer.CH")}</Button>   
       </ButtonContainer> 

            </useForm>

            </MaxContainer>
          </BoderShadow>


          </Grid.Container>
        <Spacer y={3} />
      </div>
   
    )
}