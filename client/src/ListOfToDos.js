import React, { Component } from 'react';


export default class ListOfToDos extends Component {

  render() {

    let className = 'todo-item';
      if (this.props.displayStrikethrough === true) {
        className += ' strikethrough';
    }


    // To keep things more readable
    let toDoArray = this.props.parent_state.toDoList

    // Below we map over the array of list items, and
    // create an unordered list
    return (
      <div className='todolist'>


        <ul>
          {toDoArray.map( (todoobject) => {
            return (
              <li
                key={todoobject.id}
                className="todoListItem"
              >
                  <button
                    id={todoobject.id}
                    type="button"
                    className="delete-x"
                    value={todoobject.todoitem}
                    // onClick={this.props.onClickRemoveItem}><i className="fas fa-times"></i></button>
                    onClick={this.props.handleClickRemoveItem}>&times;</button>

                  <span
                    // We'll add a strikethrough with css, if the user clicks
                    displayStrikethrough={this.props.displayStrikethrough}
                    className={className}
                    onClick={this.props.handleAddStrikethrough}>{todoobject.todoitem}</span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}




