import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { BY_PROP_KEY } from '../constants/prop-key';

const PasswordForgetPage = () => 
    <div>
        <h1 className="main-title">Password Forget</h1>
        <PasswordForgetForm />
    </div>

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { email } = this.state;
        auth.doPasswordReset(email)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(BY_PROP_KEY('error', error));
            });
        event.preventDefault();
    }

    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';

        return(
            <div className="signup">
                <form className="signup__form" onSubmit={this.onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="signup__form-input" id="email" type="text" placeholder="Email Address" value={this.state.email} onChange={event => this.setState(BY_PROP_KEY('email', event.target.value))}/>
                    
                    <button className="signup__form-button" disabled={isInvalid} type="submit">Reset My Password</button>
                    { error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

const PasswordForgetLink = () =>
    <p>
        <Link to="/pw-forget">Forgot Password</Link>
    </p>

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink }