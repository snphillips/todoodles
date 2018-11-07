import React, { Component } from 'react';
import moment from 'moment';




const dayOfTheWeek = moment().format('dddd');




export default class Header extends Component {
  render() {
    return (

        <header>
          <h1>It's {dayOfTheWeek}</h1>
          <h2>What are you going to do?</h2>
        </header>
    );
  }
}
