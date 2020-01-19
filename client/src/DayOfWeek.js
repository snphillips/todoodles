import React from 'react';
import moment from 'moment';

export default function DayOfWeek() {
  let moment = require('moment');
  return (
    <div className="day-of-week">
      <h2>to do on {moment().format('dddd')}:</h2>
    </div>
  );
}
