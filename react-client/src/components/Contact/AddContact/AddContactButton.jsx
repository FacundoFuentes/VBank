import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';

import styled from "styled-components";
import {PersonAdd} from "@styled-icons/evaicons-solid/PersonAdd"
import { addContact, resetAddContact } from '../../../redux/reducers/ContactSlice';
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
    const error = useSelector(state => state.contacts.error)

   
   



    const [visible, setVisible] = useState(false);

    const { control, handleSubmit,reset, formState: { errors }} = useForm();

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        reset({
            data: "",
            description:"",
        });
        dispatch(resetAddContact())

    };


 
  const onSubmit = async(data) => {
/*      console.log(data) */
try{
  const response = await dispatch(addContact(data))
  console.log(response)
  if(response.type === "contacts/add/fulfilled")  setVisible(false)
  
}catch (error){
    console.log(error)
}
 
  


      
      
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
        rules={{required:true, maxLength: 16}}
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        size="large"
        labelPlaceholder="Username/ CVU"
         color="#f5f5f5" {...field} />}
      />
      {errors.data?.type === 'required' && <p className="error">This field is required</p>}
      {errors.data?.type === 'maxLength' && <p className="error">It should only have a max of 16 characters</p>}
 
            <Controller
        className="fields"
        name="description"
        control={control}
        defaultValue=""
        rules={{maxLength: 16}}
        render={({ field }) => <Input clearable
        bordered
        fullWidth
        size="large"
        labelPlaceholder="Ej: Alquiler"
         color="#f5f5f5" {...field} />}
      />
      {errors.description?.type === 'maxLength' && <p className="error">It should only have a max of 16 characters</p>}

      {error && <p className="error">{error.error}</p>}
     




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
