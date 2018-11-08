import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {

    // making a const to keep things tidy
    const toDoArray = this.props.parent_state.toDoList

    // Below we map over the array of list items, and
    // create an unordered list

    return (
      <div className='todolist'>

        <ul>

          {toDoArray.map(listitem => {
            return (
              <li key={listitem.key}>{listitem}</li>
            )
          })}

        </ul>

      </div>
    );
  }
}
