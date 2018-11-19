import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (

      <form onSubmit={this.props.handleSubmit}>

        <input className="input-field"
               id="todo"
               name="todo"
               type="text"
               placeholder="add new todo to list"
               value={this.props.newToDo}
               onChange={this.props.handleChange} />

        <input className="submit-button"
               type="submit"
               value="submit" />

      </form>

    );
  }
}
