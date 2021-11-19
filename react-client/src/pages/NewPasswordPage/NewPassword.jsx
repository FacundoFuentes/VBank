import React, {useState}from "react";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from "react-redux";
import { Modal, Button, Input} from '@nextui-org/react';
import { useHistory, useParams } from 'react-router';
import styled from "styled-components";
import Nav from "../../components/Nav/Nav"
import axios from "axios"
import {toast} from 'react-toastify'
import success from "../../img/success.gif"

const PageContainer= styled.div`
width: 100%;
height 100vh;
display:flex;
flex-direction:column;
align-items:center;

`;


const Box= styled.div`
margin: auto 0;
width: 50%;
height: 65%;
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
	justify-content:flex-start;
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
		font-size: 10px;
	}
}

#btns{
	width:100%;
	display:flex;
	justify-content:center;
	margin-top: 20px;
	button{
		width: 60%;
		border-radius 20px;
	}
}
}
`;


const NewPassword =()=>{

	 const { control, getValues, handleSubmit,formState: { errors }} = useForm();
	 const [error, setError] = useState("")
	 const [msg, setMsg] = useState("");
	 const {userId, token} = useParams();
	 const dispatch= useDispatch()
	 const history = useHistory()

	  const [visible, setVisible] = useState(false);
	  const handler = () => setVisible(true);
  const closeHandler = () => {
      setVisible(false);
      setError('');
      history.push("/")
   
  }

	 const onSubmit = async(data) => {
	 
	 	const {password}= data;
	 	console.log(password)
     axios.post(`http://localhost:3001/user/password-reset/${userId}/${token}`, {password})
	 	
  .then(response=> {
   console.log(response)
   if(response.data.status ==="ok")setVisible(true)
   
   
   
   
   }).catch(error=>{
   	console.log(error.response)
     setError(error.response.data.data)
   
     
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
  const handleClick=()=>{
  		history.push("/")
  }
	return(
		<PageContainer>
		<Nav/>
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
      
       	<Modal
       	closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
       	>
       	 <img src={success} alt='loading gif' />
       	</Modal>
            </div>       
		<div id="btns">
                <Button color="#2ca1de"auto type="submit">
                     Send
                </Button>
		</div>
		</form>
		




		



		</Box>

		</PageContainer>
		)
}

export default NewPassword;