import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (

      <form onSubmit={this.handleSubmit}>

        <input id="todo"
               name="todo"
               type="text"
               placeholder="add to do item" />

        <button onClick={this.props.handleSubmit}>submit</button>

      </form>

    );
  }
}
