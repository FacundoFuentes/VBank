import React, {useState}from "react";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from "react-redux";
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
	height: 100%;
}
.fields{
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


const NewPassword =()=>{

	 const { control, getValues, handleSubmit,reset, formState: { errors }} = useForm();
	 const [error, setError] = useState("")
	 const [msg, setMsg] = useState("");
	 const {userId, token} = useParams();
	 const dispatch= useDispatch()
	 const history = useHistory()

	 const onSubmit = async(data) => {
	 
	 	const {password}= data;
	 	console.log(password)
     axios.post(`http://localhost:3001/user/password-reset/${userId}/${token}`, password)
	 	
  .then(response=> {
   console.log(response)
   
   
   
   }).catch(error=>{
   	console.log(error.response)
     /*setError(error.response.data.data)*/
   
     
    /* if (error.response.data.data === "Unauthorized"){
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
		<h2> New Password</h2>
		</div>
	
		
		 <form onSubmit={handleSubmit(onSubmit)}>
		<div  className="fields">
          <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        rules={{required:true , pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/}}
        render={({ field }) => <Input.Password className="input"
        underlined 
        labelPlaceholder="New Password"
         color="#f5f5f5" {...field} />}
      />
      {errors?.password?.type === "required" && <p className="error">This field is required</p>}
      {errors?.password?.type === "pattern" && (
        <p className="error">Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
      )}
            </div>

     <div  className="fields">
          <Controller
        className="fields"
        name="samePassword"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/,
        validate: (value)=>{
        	const {password}= getValues();
        	return password === value;
        }
      	}}
        render={({ field }) => <Input.Password className="input"
        underlined 
        labelPlaceholder="Confirm Password"
         color="#f5f5f5" {...field} />}
      />
      {errors?.samePassword?.type === "required" && <p className="error">This field is required</p>}
      {errors?.samePassword?.type === "pattern" && (
        <p className="error">Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
      )}
       {errors?.samePassword?.type === "validate" && (
        <p className="error">Password don´t match</p>
      )}

       { error && (
        <p className="error">{error}</p>
      )}
       { msg && (
        <p className="error">{msg}</p>
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

export default NewPassword;