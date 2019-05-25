import React, { Component } from 'react';
import '../../css/App.css';

class SeatItem extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    // seatClock = ()=>{
    //     if(this.props.isAllocate){
    //         // console.log(this)
    //         return;
    //     }else{
    //         console.log(this.props)
            
    //     }
    // }
    // componentWillUpdate(){
    //     console.log(this.props);
    // }
    render() {
        // console.log(this.props);
        return (
            <li onClick={this.props.onClick} id={this.props.className}></li>
        );
    }
}

export default SeatItem;