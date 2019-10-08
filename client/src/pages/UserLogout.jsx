import React from 'react';

import styled from 'styled-components';

const Logout = styled.button.attrs({
    className: `btn btn-danger`
})`
    margin: 15px 15px 15px 15px
`

export function UserLogout(){
    function goHome(){
        window.location.assign('/');
    }

    return(
        <Logout onClick={goHome}>Logout</Logout>
    )
}