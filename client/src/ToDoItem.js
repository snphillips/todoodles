import React, { Component } from 'react';

export default class ToDoItem extends Component {
  render() {
    return (




      <div className="todo-item">

        <button type="button"
                className="close"
                 onClick={this.onClickClose}>&times;</button>


       (insert todo items)


      </div>
    );
  }
}
