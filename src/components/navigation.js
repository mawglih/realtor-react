import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './signout';


const Navigation = (props) => {
    props.authUser ? console.log("auth user is: ", props.authUser.email) : console.log("not logged in");
    return(
        <div>
            { props.authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
        </div>
    )
}


const NavigationAuth = () =>
    <div className="nav">
        <ul className="nav__ul">
            <li className="nav__ul-link"><Link to={routes.HOME}>Home</Link></li>
            <li className="nav__ul-link"><Link to={routes.ABOUT}>About</Link></li>
            <li className="nav__ul-link"><Link to={routes.ACCOUNT}>Account</Link></li>
            <li className="nav__ul-link"><Link to={routes.SIGN_UP}>Sign Up</Link></li>
            <li className="nav__ul-link"><Link to={routes.SIGN_IN}>Login</Link></li>
            <li><SignOutButton /></li>
        </ul>    
        
    </div>


const NavigationNonAuth = () =>
    <div className="nav">
        <ul className="nav__ul">
            <li className="nav__ul-link"><Link to={routes.HOME}>Home</Link></li>
            <li className="nav__ul-link"><Link to={routes.ABOUT}>About</Link></li>
            <li className="nav__ul-link"><Link to={routes.ACCOUNT}>Account</Link></li>
            <li className="nav__ul-link"><Link to={routes.SIGN_UP}>Sign Up</Link></li>
            <li className="nav__ul-link"><Link to={routes.SIGN_IN}>Login</Link></li>
        </ul>
    </div>
export default Navigation;