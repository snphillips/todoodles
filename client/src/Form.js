import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (

      <form onSubmit={this.props.handleSubmit}>

        <input
          className="input-field"
          id="todo"
          name="todo"
          type="text"
          placeholder="add new todo to list"
          value={this.props.newToDo}
           // onKeyPress allows user to hit "enter" to submit form
          onKeyPress={this.props.handleChange}
        />

      </form>

    );
  }
}
