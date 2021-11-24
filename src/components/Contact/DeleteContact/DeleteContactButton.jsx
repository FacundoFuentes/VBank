import React,{useState} from 'react'

import { Modal, Button, Text} from '@nextui-org/react';

import { useDispatch } from 'react-redux';

import styled from "styled-components";


import {Delete} from "@styled-icons/fluentui-system-filled/Delete"
import { deleteContact } from '../../../redux/reducers/ContactSlice';

const StyledModal = styled(Modal)`
.error{
    margin:0;
     margin-top: 3px;
     margin-left: 5px;
     color:#dc3545;
     font-size: 15px;
}

`;
const StyledDelete = styled(Delete)`
width: 25px;
cursor:pointer;
color: #0070f3;

`;


const DeleteContactButton = ({contact}) => {

    const dispatch= useDispatch();

    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);

    };


    const handleSubmit = () => {
        // 
        const payload = { _Id: contact._id};
        console.log(payload);
        dispatch(deleteContact(payload));
      };



    return (

    <div>
        <StyledDelete onClick={handler}/>
       
        <StyledModal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Delete Contact
                </Text>
            </Modal.Header>
           

            <Modal.Body >
            <label>{`Are you sure you want to delete ${contact.description}?`}</label>

            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                Cancel
                </Button>
                <Button auto type="submit" onClick={handleSubmit}>
                     Delete
                </Button>
            </Modal.Footer>
        </StyledModal>
    </div>
    );    
    }

export default DeleteContactButton
