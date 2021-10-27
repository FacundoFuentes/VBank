import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input, Row, Checkbox} from '@nextui-org/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../../../redux/reducers/userSlice';

const LoginModal = () => {
    const dispatch= useDispatch();
    const userState = useSelector(state => state.user);

    const {loggedInUser} =userState; 



    const [visible, setVisible] = useState(false);



    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
    };

    const history= useHistory();

    useEffect(() => {
        if (loggedInUser){
            //redirect con el hook useHistory
            history.push("/home"); //esto me lleva hacia esta ventana

        }
    }, [loggedInUser])
  




    const { control, handleSubmit } = useForm();
  
 
  const onSubmit = (data) => {
    console.log(data)
      dispatch(signinUser(data));   

  }

    return (
    <div>
       <Button auto ghost color="#2CA1DE"  onClick={handler}>
           Login
        </Button> 
        <Modal
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
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        color="primary"
        size="large"
        labelPlaceholder="DNI"
         color="#f5f5f5" {...field} />}
      />
            <Controller
        className="fields"
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        color="primary"
        size="large"
        labelPlaceholder="Username"
         color="#f5f5f5" {...field} />}
      />
            <Controller
        className="fields"
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Input.Password clearable
        bordered
        fullWidth
        type="password"
        color="primary"
        size="large"
        labelPlaceholder="Password"
         color="#f5f5f5" {...field} />}
      />
      
                <Row justify="space-between">
                <Checkbox>
                    <Text size={14}>
                    Remember me
                    </Text>
                </Checkbox>
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
        </Modal>
    </div>
    );    
    }

export default LoginModal
