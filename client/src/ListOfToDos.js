import React, { Component } from 'react';

export default class ListOfToDos extends Component {
  render() {








    return (
      <div>
        <ul>
        <li>{this.props.parent_state.toDoList}</li>











        </ul>
      </div>
    );
  }
}
