import React, { Component } from 'react';
import { db } from '../firebase';
import ReservationsPage from './reservations';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state= {
            users: null,
        };

    }
    // componentDidMount() {
    //     db.onceGetUsers().then(snapshot =>
    //         this.setState(() => ({users: snapshot.val()})));
    //     console.log('user: ', this.state.users);
    // }
    render() {
        return(
            <div>
                <h1 className="main-title">Home page</h1>
                <ReservationsPage />
            </div>
        );
    }
}


export default HomePage;