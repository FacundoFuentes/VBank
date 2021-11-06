import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Text, Input, Row} from '@nextui-org/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {getContacts} from "../../redux/reducers/ContactSlice"
import styled from "styled-components";
import {Contact} from "@styled-icons/boxicons-solid/Contact"
import AddContactButton from './AddContact/AddContactButton';
import DeleteContactButton from './DeleteContact/DeleteContactButton';

const StyledModal = styled(Modal)`
.error{
    margin:0;
     margin-top: 3px;
     margin-left: 5px;
     color:#dc3545;
     font-size: 15px;
}
`;

const ContactBlack = styled(Contact)`
  color: black;
  height: 30px;
  
`;
const ContactRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
  :last-child {
    margin-bottom: 0;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 20px;
    margin-right: 8px;
  }
`;



const ContactModal = () => {
    const dispatch= useDispatch();

    const contacts = useSelector(state => state.contacts.contactList)
    console.log(contacts)

    /* useEffect(() => {
            dispatch(getContacts())
    }, [])
 */
   



    const [visible, setVisible] = useState(false);

    const { control, handleSubmit,reset, formState: { errors }} = useForm();

    const handler = () => {
        setVisible(true)
        dispatch(getContacts())
    
        
    };

    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
        reset({
            dni: "",
            username:"",
            password:""
        });
    };

    const history = useHistory();
 
  const onSubmit = (data) => {
    // console.log(data)
  
      setVisible(false)
      
  }

    return (

    <div>
        <ContactBlack onClick={handler}/>
       
        <StyledModal
            closeButton
            preventClose
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                <h2>My Contacts</h2>
                </Text>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>

            <Modal.Body >
                {contacts && contacts
                .map(contact =>(
                    <ContactRow key={`contact-id-${contact._id}`}>
                        <span> {contact.description}</span>
                        <Action>
                      {/*   <UpdateContactButton contactId={goal.id} /> */}
                        <DeleteContactButton contact={contact}/>
                        </Action>

                    </ContactRow>

                ))}
               

            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                Close
                </Button>
                <AddContactButton/>
            </Modal.Footer>
            </form>
        </StyledModal>
    </div>
    );    
    }

export default ContactModal