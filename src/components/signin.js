import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './signup';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { BY_PROP_KEY } from '../constants/prop-key';
import { PasswordForgetLink } from './password-forget';

const SignInPage = ({history}) =>
    <div>
        <h1 className="main-title">SignIn</h1>
        <SignInForm history={history}/>
        <div className="signup__link">
            <SignUpLink />
        </div>
        <div className="signup__link">
            <PasswordForgetLink />
        </div>
        
    </div>

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE};
    }
    onSubmit = (event) => {
        const { email, password, } = this.state;
        const { history, } = this.props;
        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(BY_PROP_KEY('error', error));
            });
        event.preventDefault();    
    }
    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid = 
            password === '' ||
            email === '';

        return(
            <div className="signup">
                <form className="signup__form" onSubmit={this.onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="signup__form-input" id="email" type="text" placeholder="Email Address" value={email} onChange={event => this.setState(BY_PROP_KEY('email', event.target.value))}/>
                    <label htmlFor="password">Password</label>
                    <input className="signup__form-input" id="password" type="password" placeholder="Password" value={password} onChange={event => this.setState(BY_PROP_KEY('password', event.target.value))}/>
                    <button className="signup__form-button" disabled={isInvalid} type="submit">Sign In</button>
                    { error && <p>{error.message}</p>}
                </form>
            </div>
            
        );
    }
}


export default withRouter(SignInPage);

export { SignInForm, };