import React, { Component } from 'react';

 class ReservationItem extends Component {
    handleClick() {
        this.props.handleOnClick(this.props.id);
    }
    render() {
        return(
            <tr className="res__table_row">
    
                            <td>{this.props.name}</td>
                            <td>{this.props.room}</td>
                            <td>{this.props.dateIn}</td>
                            <td>{this.props.dateOut}</td>
                            <td><button><i className="fa fa-close" onClick={this.handleClick.bind(this)}></i></button></td>
    
            </tr>
        );
    }
 }

export default ReservationItem;       