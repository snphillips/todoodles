import React, { Component } from 'react';
import Header from './Header';
import Today from './Today';
import ThisWeek from './ThisWeek';
import ThisMonth from './ThisMonth';
import Sometime from './Sometime';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // This binding is necessary to make `this` work in the callback




  }
  render() {
    return (
      <div className="App">
        <Header />
        <Today />
        <ThisWeek />
        <ThisMonth />
        <Sometime />
      </div>
    );
  }
}
