import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (

      <form onSubmit={this.props.handleSubmit}>

        <input id="todo"
               name="todo"
               type="text"
               placeholder="add new todo to list"
               value={this.props.newToDo}
               onChange={this.props.handleChange} />

        <input type="submit"
               value="submit" />

      </form>

    );
  }
}
