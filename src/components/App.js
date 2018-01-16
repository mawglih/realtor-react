import React, { Component }  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './navigation';
import SignUpPage from './signup';
import SignInPage from './signin';
import PasswordForgetPage from './password-forget';
import HomePage from './home';
import AccountPage from './account';
import AboutPage from './about';
import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
        authUser ? this.setState(() => ({authUser})) : this.setState (() => ({authUser: null}));
    });
  }

  render() {
    return(
      <BrowserRouter>
      <div>
        <Navigation authUser={this.state.authUser}/>
        <hr />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
        <Route
          exact path={routes.HOME}
          component={() => <HomePage />}
        />
        <Route
          exact path={routes.ACCOUNT}
          component={() => <AccountPage authUser={this.state.authUser}/>}
        />
        <Route
          exact path={routes.ABOUT}
          component={() => <AboutPage />}
        />
      </div>
  </BrowserRouter>
    );
  }
}


    
export default App;
