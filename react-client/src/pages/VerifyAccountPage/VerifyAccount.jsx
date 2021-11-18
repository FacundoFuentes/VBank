import React, {useState}from "react";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from "react-redux"
import { Button, Input} from '@nextui-org/react';
import { useHistory, useParams } from 'react-router';
import styled from "styled-components";

import axios from "axios"

const PageContainer= styled.div`
width: 100%;
height 100vh;
display: grid;
place-items: center;

`;


const Box= styled.div`
width: 50%;
height: 60%;
background-color: white;
border-radius: 20px;
display: flex;
flex-direction:column;
padding: 0 15px;
-webkit-box-shadow: -10px 0px 13px -7px #00000052,
    10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052,
    5px 5px 15px 5px rgba(0, 0, 0, 0);

#title{
margin-top: 20px;
margin-bottom:25px;
	h2{
		font-size: 24px;
		text-align:center;
	}
}

form{
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:space-around;
	height: 80%;
}
.field{
	display: flex;
	flex-direction:column;
	align-items: center;

	width: 60%;
	margin-top 20px;
	margin-bottom 30px;
	
	.jsx-4281389978 {
		width: 100%;

	}
	.error{
		color:red;
		font-size: 15px;
	}
}

#btns{

	margin-bottom 50px;
	button{
		margin-right: 10px;
		margin-left: 10px;
	}
}
`;


const VerifyAccount =()=>{

	 const { control, handleSubmit,reset, formState: { errors }} = useForm();
	 const [error, setError] = useState("")
	 const dispatch= useDispatch()
	 const history = useHistory()
	 const {username}= useParams();
	 const onSubmit = async(code) => {
	 	console.log(code)
     axios.patch(`http://localhost:3001/user/emailVerification/${username}`, code)
  .then(response=> {
   console.log(response.data)
   if (response.data.status === "wait") setError(response.data.data)
   	if(response.data.status === "ok") history.push("/")
   
   
   }).catch(error=>{
   	console.log(error.response.data)
     setError(error.response.data.status)
   
     
     /*if (error.response.data.data === "Unauthorized"){
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
     }*/
    
   })
  }
  const handleClick=()=>{
  		history.push("/")
  }
	return(
		<PageContainer>
		<Box>
		<div id="title">
		<h2> Verify Account</h2>
		</div>
		<span>
			Introduce el codigo  de verificacion:		</span>
		
		
		 <form onSubmit={handleSubmit(onSubmit)}>
		<div  className="field">
          <Controller
        className="fields"
        name="code"
        control={control}
        defaultValue=""
        rules={{required:true, pattern:/[A-Za-z]{2,254}/i }}
        render={({ field }) => <Input className="input"
        underlined 
        labelPlaceholder="Code"
         color="#f5f5f5" {...field} />}
      />
      {errors?.code?.type === "required" && <p className="error">This field is required</p>}
      {errors?.code?.type === "pattern" && (
        <p className="error">Alphabetical characters only</p>
      )}
       { error && (
        <p className="error">{error}</p>
      )}
            </div>
		<div id="btns">
			<Button auto flat color="error" onClick={handleClick}>
                Cancel
                </Button>
                <Button auto type="submit">
                     Send
                </Button>
		</div>
		</form>
		




		



		</Box>

		</PageContainer>
		)
}

export default VerifyAccount;