import React, { Component } from 'react';

export default class ThisWeek extends Component {
  render() {
    return (

        <div className="today">
          <h3>this week</h3>
          <form onSubmit={this.addItemThisWeek}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
    );
  }
}
