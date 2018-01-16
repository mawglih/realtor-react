import React, { Component } from 'react';
import { db } from '../firebase';
import { BY_PROP_KEY } from '../constants/prop-key';

const INITIAL_STATE = {
    name : '',
    room: '',
    dateA : new Date().toISOString().slice(0, 10),
    dateD : new Date().toISOString().slice(0, 10),
    error : null,
}

class CreateReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const { name, dateA, dateD, room, } = this.state;
        db.updateReservations(this.state)
            .catch(error => {
                this.setState(BY_PROP_KEY('error', error));
            });
        event.preventDefault();    
    }
    
    
    render() {
        const {
            name,
            dateA,
            dateD,
            optionsState,
            error
        } = this.state;
    
        const isInvalid = 
        dateA === '' ||
        dateD === '' ||
        name === '';
    return(
        <div className="res">
            
            <h2>Reserve a room</h2>
            <form className="signup__form" onSubmit={this.onSubmit}>
            <label htmlFor="name">Full name</label>
            <input className="signup__form-input" id="name" type="text" placeholder="Full name" value={name} onChange={event => this.setState(BY_PROP_KEY('name', event.target.value))}/>
            <label htmlFor="opt">Room type select</label>
            <select className="signup__form-input" id="opt" value={optionsState} onChange={event => this.setState(BY_PROP_KEY('optionsState', event.target.value))}>
                <option value="standard">Standard Room</option>
                <option value="double">Double Room</option>
                <option value="junior">Junior Suite</option>
                <option value="suite">Suite</option>
                <option value="2bedroom">Two Bedroom</option>
            </select>
            <label htmlFor="dateA">Date of Arrival</label>
            <input className="signup__form-input" id="dateA" type="date" placeholder="date of arrival" value={dateA} onChange={event => this.setState(BY_PROP_KEY('dateA', event.target.value))}/>
            <label htmlFor="dateD">Departure date</label>
            <input className="signup__form-input" id="dateD" type="date" placeholder="Departure date" value={dateD} onChange={event => this.setState(BY_PROP_KEY('dateD', event.target.value))}/>
            <button className="signup__form-button" disabled={isInvalid} type="submit">Reserve a room</button>
            { error && <p>{error.message}</p>}
        </form>
        </div>
    );
}
}

export default CreateReservation;
