import React, { useEffect, useState } from 'react'

import { Modal, Button, Text, Loading} from '@nextui-org/react';

import { useDispatch, useSelector } from 'react-redux';
import {getContacts} from "../../redux/reducers/ContactSlice"

import styled from "styled-components";
import {Contact} from "@styled-icons/boxicons-solid/Contact"
import { useForm} from "react-hook-form";

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
  button{
   background-color:transparent;
    border:none;
    cursor:pointer;

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



const ContactModal = ({handleInputChange}) => {
    
    const dispatch= useDispatch();

    const contacts = useSelector(state => state.contacts.contactList)
 
    
    const loading = useSelector(state => state.contacts.loading)

    const [visible, setVisible] = useState(false);
    const { handleSubmit} = useForm();
    
  const onSubmit = ()=>{
    setVisible(false)
  }

    const handler = () => {
        setVisible(true)
    };
    const closeHandler = () => {
        setVisible(false);
    };

  useEffect(() => {
    if (visible) {
      dispatch(getContacts());
    }
  
  }, [dispatch, visible]);

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
            
            {loading === "pending" ? (
        <div><Loading type="gradient"/></div>
      ) : (

        <>

{contacts && contacts.length > 0 ? contacts
.map(contact =>(
    <ContactRow key={`contact-id-${contact._id}`}>
        <button  value={contact.username} onClick={handleInputChange}> {contact.description}</button>
        <Action>
      {/*   <UpdateContactButton contactId={goal.id} /> */}
        <DeleteContactButton contact={contact}/>
        </Action>

    </ContactRow>

)):(
  <p> Empty, Add One</p>
)}
   
        </>
      )}
              
              
              
               

            </Modal.Body>
            </form>
            <Modal.Footer>
                <Button auto flat color="error" onClick={closeHandler}>
                Close
                </Button>
                <AddContactButton/>
            </Modal.Footer>
        </StyledModal>
    </div>
    );    
    }

export default ContactModal