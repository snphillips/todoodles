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
          {toDoArray.map( (todoobject, index) => {


            let className = 'todo-item';
              if (todoobject.displayStrikethrough === true) {
                className += ' bluetest';
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
                    // className={(this.props.parentState.displayStrikethrough === true ? 'bluetest' : 'noclass')}
                    className={className}
                    // onClick={this.props.handleAddStrikethrough}
                    onClick={ ()=>{this.props.handleAddStrikethrough(index)}  }
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




