import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { BY_PROP_KEY } from '../constants/prop-key';

const SignUpPage = ({history}) =>
    <div>
        <h1 className="main-title">SignUp</h1>
        <SignUpForm history={history}/>

        
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE};
    }
    onSubmit = (event) => {
        const { username, email, passwordOne } = this.state;
        const { history, } = this.props;
        auth.doCreateUserWithEmailAndPassword(email,passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.uid, username, email)
                .then(()=> {
                    this.setState(() => ({...INITIAL_STATE}));
                    history.pushState(routes.HOME);
                })
                .catch(error => {
                    this.setState(BY_PROP_KEY('error', error));
                });
            })
            .catch(error => {
                this.setState(BY_PROP_KEY('error', error));
            });
        event.preventDefault();    
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <div className="signup">
                <form className="signup__form" onSubmit={this.onSubmit}>
                    <label htmlFor="name">Full name</label>
                    <input className="signup__form-input" id="name" type="text" placeholder="Full Name" value={username} onChange={event => this.setState(BY_PROP_KEY('username', event.target.value))}/>
                    <label htmlFor="email">Email</label>
                    <input className="signup__form-input" id="email" type="text" placeholder="Email Address" value={email} onChange={event => this.setState(BY_PROP_KEY('email', event.target.value))}/>
                    <label htmlFor="password1">Password</label>
                    <input className="signup__form-input" id="password1" type="password" placeholder="Password" value={passwordOne} onChange={event => this.setState(BY_PROP_KEY('passwordOne', event.target.value))}/>
                    <label htmlFor="password2">Re-enter password</label>
                    <input className="signup__form-input" id="password2" type="password" placeholder="Confirm password" value={passwordTwo} onChange={event => this.setState(BY_PROP_KEY('passwordTwo', event.target.value))}/>
                    <button className="signup__form-button" disabled={isInvalid} type="submit">Sign Up</button>
                    { error && <p>{error.message}</p>}
                </form>
            </div>
            
        );
    }
}

const SignUpLink = () => 
 <p>Do not have and account?
     {' '}
     <Link to={routes.SIGN_UP}>Sign Up</Link>
</p>
export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };