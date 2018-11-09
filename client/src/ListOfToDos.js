import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {

    // making a const to keep things tidy
    let toDoArray = this.props.parent_state.toDoList

    // Below we map over the array of list items, and
    // create an unordered list
    if(toDoArray.length == 1){
      return ("")
    }
    return (
      <div className='todolist'>

        <ul>

          {toDoArray.map((listitem, index) => {
            return (
              <li key={index}> {listitem}</li>
            )
          })}

        </ul>

      </div>
    );
  }
}
