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


const RecoverPass =()=>{

	 const { control, handleSubmit,reset, formState: { errors }} = useForm();
	 const [error, setError] = useState("")
	 const [msg, setMsg] = useState("");
	 const dispatch= useDispatch()
	 const history = useHistory()

	 const onSubmit = async(data) => {
	 	console.log(data)
     axios.post('http://localhost:3001/user/password-reset', data)
  .then(response=> {
   console.log(response)
   if(response.data.status === "ok") setMsg(response.data.data)
   
   
   }).catch(error=>{
   	console.log(error)
     setError(error.response.data.data)
   
     
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
		<h2> Recover Password</h2>
		</div>
		<span>
			Introduce tu correo electrónico para buscar tu cuenta.
		</span>
		
		
		 <form onSubmit={handleSubmit(onSubmit)}>
		<div  className="field">
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

export default RecoverPass;