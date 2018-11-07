import React, { Component } from 'react';

export default class Sometime extends Component {
  render() {
    return (

        <div className="sometime">
          <h3>sometime</h3>
          <form onSubmit={this.addItemSometime}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
    );
  }
}
