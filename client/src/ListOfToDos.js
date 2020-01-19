import React, { Component } from 'react';


export default class ListOfToDos extends Component {

  render() {

    // To keep things more readable
    let toDoArray = this.props.parentState.toDoList

    // Below we map over the array of list items, and
    // create an unordered list
    return (
      <div className='todolist'>


        <ul>
          {toDoArray.map((todoobject, index) => {

            // Here's where we add the className to add the strikethrough css, if
            // the user clicks an item. (see handleAddStrikethrough on App.js)
            let className = 'todo-item';
            if (todoobject.displaystrikethrough === true) {
              className += ' strikethrough';
            }


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
                  id={todoobject.id}
                  className={className}
                  // Have to pass index number, therefore must be a callback
                  onClick={() => { this.props.handleAddStrikethrough(index) }}
                >
                  {todoobject.todoitem}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}




