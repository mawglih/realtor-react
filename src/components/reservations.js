import React, { Component } from 'react';
import { db } from '../firebase';
import ReservationItem from './reservation-item';
import  _ from 'lodash';
import CreateReservation from './create-reservation';
import '../../node_modules/font-awesome/css/font-awesome.min.css';



class ReservationsPage extends Component {
        constructor(props){
            super(props);
            this.state = { };
        }
        componentDidMount() {
            db.onceGetResevations().then(snapshot =>
                this.setState({reservations: snapshot.val()}), () => {
                    console.log("reservations: ", this.state.reservations);
                }
            );
        }
        handleOnClick(item) {

            return db.removeReservation(item);
        }
        
        renderItem() {
            return(
                _.map(this.state.reservations, (item, index) => {
                    console.log(index, item);
                    return <ReservationItem handleOnClick={e => this.handleOnClick(e)} key={index} id={index} name={item.name} dateIn={item.dateA} dateOut={item.dateD} room={item.optionsState} />
                })
        
    )}
        render() {

            return(
                <div>
                    <h2>List of current reservations</h2>
                    <table className="res__table">
                        <thead>
                    <tr className="res__table_row">
                        <th>Name</th>
                        <th>Room type</th>
                        <th>Date In</th>
                        <th>Date Out</th>
                        <th><i className="fa fa-close"></i></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.renderItem()}
        
                </tbody>
            </table>
                   <hr />
                <CreateReservation />
                </div>
            );
        }
    }
    
    
    export default ReservationsPage;