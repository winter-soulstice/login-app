import React, { useState } from 'react';
import api from '../api/index';
import { useDispatch } from 'react-redux';
import { login } from '../actions';

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
export function UserLogin(props) {
    // Hook declaration in order to store state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const history = props.history;

    function getErrors(er){
        const message = er.response.data.error;
        const values = Object.values(message);
        if (values.length > 2)
        {
            return window.alert(message);
        }
        var errors = "";
        for (var i=0; i<values.length; i++){
            errors += values[i] + '. \n';
        }
        window.alert(errors);
    }

    // Asynchronous function to save each user
    async function loginUser() {
        const payload = {username, password};

        let response;
        let complete = false;
        await api.loginUser(payload).then((res) => {
            response = res;
            const success = 200;
            if (response.status === success){
                complete = true;
            }
        }).catch(err => getErrors(err));

        if (complete){
            dispatch(login());
            history.push('/');
        }
    }

    async function goHome() {
        history.push('/');
    }

    return(
        <Wrapper>
            <Title>Login</Title>

            <Label>Username: </Label>
            <InputText 
                type="text"
                value={username}
                onChange = {e => {setUsername(e.target.value)}} 
            />

            <Label>Password: </Label>
            <InputText
                type="password"
                value={password}
                onChange = {e => {setPassword(e.target.value)}} 
            />
            
            <Button onClick={loginUser}>Login</Button>
            <CancelButton onClick={goHome}>Cancel</CancelButton>
        </Wrapper>
    )
}