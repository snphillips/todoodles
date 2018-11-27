import React, { Component } from 'react';
import moment from 'moment';

export default class DayOfWeek extends Component {
  render() {


  let moment = require('moment');




    return (

      <div className="day-of-week">
        <h2>to do on {moment().format('dddd')}:</h2>
      </div>
    );
  }
}
