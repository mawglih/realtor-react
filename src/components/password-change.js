import React, { Component } from 'react';
import { auth } from '../firebase';
import { BY_PROP_KEY } from '../constants/prop-key';



const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { passwordOne } = this.state;
        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(BY_PROP_KEY('error', error));
            });
        event.preventDefault();
    }

    render() {
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return(
            <div className="signup">
                <form className="signup__form" onSubmit={this.onSubmit}>
                    <label htmlFor="passwordOne">New Password</label>
                    <input className="signup__form-input" id="passwordOne" type="text" placeholder="New Password" value={this.state.passwordOne} onChange={event => this.setState(BY_PROP_KEY('passwordOne', event.target.value))}/>
                    <label htmlFor="passwordTwo">Confirm New Password</label>
                    <input className="signup__form-input" id="passwordTwo" type="text" placeholder="Confirm New Password" value={this.state.passwordTwo} onChange={event => this.setState(BY_PROP_KEY('passwordTwo', event.target.value))}/>
                    
                    <button className="signup__form-button" disabled={isInvalid} type="submit">Reset My Password</button>
                    { error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

export default PasswordChangeForm;