import React from 'react';
import { PasswordForgetForm } from './password-forget';
import PasswordChangeForm from './password-change';

const AccountPage = (props) => {
    return(
        <div>
            { props.authUser ? <h1 className="main-title">Account: {props.authUser.email}</h1> : <h1 className="main-title">Account not logged in </h1>}
            
            {props.authUser? <PasswordForgetForm/> : null }
            <br />
            {props.authUser ? <PasswordChangeForm /> : null }
        </div>
    )
}

   

export default AccountPage;