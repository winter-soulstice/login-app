import React, { useState } from 'react';
import api from '../api/index';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px
`

const Button = styled.button.attrs({
    className: `btn btn-primary`
})`
    margin: 15px 15px 15px 15px;
`

const CancelButton = styled.button.attrs({
    className: `btn btn-danger`
})`
    margin: 15px 15px 15px 15px;
`

// Functional component used to register a user
export function UserReg(props) {
    // Hook declaration in order to store state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const history = props.history;

    function getErrors(er){
        const message = (er.response.data.error);
        const values = Object.values(message);
        if(values.length > 4)
        {
            return window.alert(message);
        }
        var errors = "";
        for(var i=0; i<values.length; i++){
            errors += values[i] + '. \n';
        }
        window.alert(errors);
    }

    // Asynchronous function to save each user
    async function saveUser() {
        const payload = {username, email, password, password2};

        await api.registerUser(payload).then((res) => {
            window.alert(res.data.message);
            setUsername('');
            setEmail(''); 
            setPassword('');
            setPassword2('');
            
        }).catch(err => getErrors(err))
    }

    async function goHome() {
        history.push('/');
    }


    return(
        <Wrapper>
            <Title>Register User</Title>

            <Label>Username: </Label>
            <InputText 
                type="text"
                value={username}
                onChange = {e=>{setUsername(e.target.value)}} 
            />

            <Label>Email: </Label>
            <InputText 
                type="email"
                value={email}
                onChange = {e=>{setEmail(e.target.value)}}
            />

            <Label>Password: </Label>
            <InputText
                type="password"
                value={password}
                onChange = {e=>{setPassword(e.target.value)}} 
            />

            <Label>Confirm Password: </Label>
            <InputText
                type="password"
                value={password2}
                onChange = {e=>{setPassword2(e.target.value)}}
            />

            <Button onClick={saveUser}>Sign Up</Button>
            <CancelButton onClick={goHome}>Cancel</CancelButton>
        </Wrapper>
    )
}