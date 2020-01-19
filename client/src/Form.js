import React from 'react';

export default function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input className="input-field"
        id="todo"
        name="todo"
        type="text"
        placeholder="add new todo to list"
        value={props.newToDo}
        // onKeyPress allows user to hit "enter" to submit form
        onKeyPress={props.handleChange}
      />
    </form>
  );
}

// onChange={this.props.handleChange}
// <input className="submit-button"
// type="submit"
// value="submit" />
