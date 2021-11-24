import React, { useState } from 'react';
import {Input, Button} from '@nextui-org/react';
import myStyles from './authorization.module.css';
import axios from 'axios';


function Authorization() {
    const [code, setcode] = useState('');
    const [color, setcolor] = useState('primary');

    
    const handleChange = (e) => {
        setcode(e.target.value) 
        if(code.length === 7) {
            setcolor('warning')
        }
    }

    const handleClick = async() => {
        const querystring = window.location.search
        const params = new URLSearchParams(querystring)
        const username = params.get('username')
        console.log(username)
        // fetch
        try{
            const link = `https://value-bank.herokuapp.com//user/emailVerification/${username}`
            const response = await axios({
                    method: 'patch',
                    url: link,
                    headers: {},
                    data: {
                        code: code
                    }
            })
            setcolor('success')
        }catch (err){
            console.log(err.response.data.status)
            setcolor('error')
        }
        // loading
        // succes // error
    }

    return (
        <div className={myStyles.container}>
            <div className={myStyles.text}>
                <h3>Verify Account</h3>
                <h4>Please enter code sent to email</h4>
            </div>
            <Input underlined color={color}  size='xlarge' style={{textAlign: 'center', textTransform: 'uppercase' }} onChange={(e) => handleChange(e)}></Input>
            <Button ghost color={color} onClick={() => handleClick()}>Verify Account</Button>
        </div>
    )
}

export default Authorization
