import React, { Component } from 'react';

export default class ThisMonth extends Component {
  render() {
    return (

        <div className="this-month">
          <h3>this month</h3>
          <form onSubmit={this.addItemThisMonth}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
    );
  }
}
