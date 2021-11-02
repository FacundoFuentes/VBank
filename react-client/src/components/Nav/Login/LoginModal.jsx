import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input, Row} from '@nextui-org/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../../../redux/reducers/userSlice';
import styled from "styled-components";

const StyledModal = styled(Modal)`
.error{
    margin:0;
     margin-top: 3px;
     margin-left: 5px;
     color:#dc3545;
     font-size: 15px;
}
`;


const LoginModal = () => {
    const dispatch= useDispatch();
    const userState = useSelector(state => state.user);

    const {loggedInUser} =userState; 

    const error = useSelector(state => state.user.signinState.error);
    console.log(error)



    const [visible, setVisible] = useState(false);

    const { control, handleSubmit,reset, formState: { errors }} = useForm();

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
        reset({
            dni: "",
            username:"",
            password:""
        });
    };

    

    const history= useHistory();

    useEffect(() => {
        if (loggedInUser){
            //redirect con el hook useHistory
            history.push("/home"); //esto me lleva hacia esta ventana

        }
    },[loggedInUser,history])
  




 
  
 
  const onSubmit = (data) => {
    console.log(data)
      dispatch(signinUser(data));   

  }

    return (
    <div>
       <Button auto ghost color="#2CA1DE"  onClick={handler}>
           Login
        </Button> 
        <StyledModal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Login
               
                
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>

            <Modal.Body >
               
            <Controller
        className="fields"
        name="dni"
        control={control}
        defaultValue=""
        rules={{ required: true, pattern: /^([0-9])*$/i, maxLength:8 }}
        render=
        {({ field }) => <Input clearable
        bordered
        fullWidth
        
        size="large"
        labelPlaceholder="DNI"
         color="#f5f5f5" 
         {...field} />}
      />
      {errors.dni?.type === 'required' && <p className="error">DNI is required</p>}
      {errors.dni?.type === 'pattern' && <p className="error">Number characters only </p>}
      {errors.dni?.type === 'maxLength' && <p className="error">it should only have a max of 8 characters</p>}
            <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
        rules={{required:true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/}}
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        
        size="large"
        labelPlaceholder="Username"
         color="#f5f5f5" {...field} />}
      />
      {errors.username?.type === 'required' && <p className="error">This field is required</p>}
      {errors.username?.type === 'pattern' && <p className="error">Username should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter and one number</p>}
            <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        rules={{required:true, pattern:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/}}
        render={({ field }) => <Input.Password clearable
        bordered
        fullWidth
        type="password"
        size="large"
        labelPlaceholder="Password"
         color="#f5f5f5" {...field} />}
      />
       {errors.password?.type === 'required' && <p className="error">This field is required</p>}
       {errors.password?.type === 'pattern' && <p className="error"> Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>}

       {error && <p className="error">{error.error}</p>}
      
      
                <Row justify="space-between">
               
                <Text size={14}>
                    Forgot password?
                </Text>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                Close
                </Button>
                <Button auto type="submit">
                Sign in
                </Button>
            </Modal.Footer>
            </form>
        </StyledModal>
    </div>
    );    
    }

export default LoginModal
