import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input} from '@nextui-org/react';
import { useDispatch } from 'react-redux';

import styled from "styled-components";
import {PersonAdd} from "@styled-icons/evaicons-solid/PersonAdd"
import { addContact } from '../../../redux/reducers/ContactSlice';


const StyledModal = styled(Modal)`
.error{
    margin:0;
     margin-top: 3px;
     margin-left: 5px;
     color:#dc3545;
     font-size: 15px;
}
`;
const StyledButton = styled(Button)`


.icon{
  padding-top: 8px;
}
`;


const AddContactButton = () => {

    const dispatch= useDispatch();
  

   

   
   



    const [visible, setVisible] = useState(false);

    const { control, handleSubmit,reset, formState: { errors }} = useForm();

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
        reset({
            data: "",
            description:"",
        });
    };


 
  const onSubmit = (data) => {
/*      console.log(data) */
     dispatch(addContact(data))
  
      /* setVisible(false) */
      
  }

    return (

    <div>
        <StyledButton auto onClick={handler}>
            <PersonAdd className="icon" width="22px" />
        </StyledButton>
       
        <StyledModal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>

            <Modal.Body >
               
            <Controller
        className="fields"
        name="data"
        control={control}
        defaultValue=""
        rules={{required:true}}
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        size="large"
        labelPlaceholder="Username/ CVU"
         color="#f5f5f5" {...field} />}
      />
      {errors.data?.type === 'required' && <p className="error">This field is required</p>}
 
            <Controller
        className="fields"
        name="description"
        control={control}
        defaultValue=""

        render={({ field }) => <Input clearable
        bordered
        fullWidth
        size="large"
        labelPlaceholder="Ej: Alquiler"
         color="#f5f5f5" {...field} />}
      />
     




            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                Close
                </Button>
                <Button  type="submit">
                     Add
                </Button>
            </Modal.Footer>
            </form>
        </StyledModal>
    </div>
    );    
    }

export default AddContactButton
