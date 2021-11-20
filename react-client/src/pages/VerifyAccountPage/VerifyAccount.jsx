import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Iconly } from 'react-iconly'

import axios from "axios";

const PageContainer = styled.div`
width: 100%;
height 100vh;
display: grid;
place-items: center;

`;

const Box = styled.div`
width: 30%;
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

const VerifyAccount = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [code, setCode] = useState("")
  const [error, setError] = useState("");
  const [color, setColor] = useState("primary");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams();

  const onSubmit = async (code) => {
    try {

      const response = await axios.patch(`http://localhost:3001/user/emailVerification/${username}`,{
        code
      } )

      console.log(response.data);
      if (response.data.status === "wait") {
        setError(response.data.data)
        setColor('success')
      }
        if (response.data.status === "ok") {
        setColor('success')
        // window.setTimeout( history.push("/"), 2000)
      }
    } catch(error) {
        console.log(error.response.data);
        setError(error.response.data.data);
        setColor('error')

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
      };
  };
  const handleClick = () => {
    history.push("/");
  };

  const handleChange = (e) => {
	setCode(e.target.value)
  setColor('primary')
  setError('')
	console.log(code)
  };
  return (
    <PageContainer>
      <Box>
        <div id="title">
				  <Button size='small' icon={<Iconly name='Home' filled='white' />} auto  onClick={handleClick}></Button>
          <h2> Verify Account</h2>
        </div>

        <form onSubmit={handleSubmit(() => onSubmit(code))}>
          <div className="field">
                <Input
                  className="input"
                  color="primary"
                  underlined
                  labelPlaceholder="Code"
                  style={{ textAlign: "center", textTransform: "uppercase" }}
				  onChange={(e) => handleChange(e)}
                />
            {/* {errors?.code?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.code?.type === "pattern" && (
              <p className="error">Alphabetical characters only</p>
            )}
            {error && <p className="error">{error}</p>} */}
          </div>
          <div id="btns">
            <Button ghost size='small'  color={color} type="submit">
              Verify
            </Button>
            <p>{error}</p>
          </div>
        </form>
      </Box>
    </PageContainer>
  );
};

export default VerifyAccount;
