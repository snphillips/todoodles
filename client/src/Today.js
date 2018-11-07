import React, { Component } from 'react';

export default class Today extends Component {
  render() {
    return (

        <div className="today">
          <h3>today</h3>
          <form onSubmit={this.addItemToday}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
    );
  }
}
