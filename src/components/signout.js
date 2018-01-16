import React from 'react';
import { auth } from '../firebase';

const SignOutButton = () =>
    <button className="signup__form-button signup__form-button--out" type="button" onClick={auth.doSignOut}>Sign Out</button>

export default SignOutButton;