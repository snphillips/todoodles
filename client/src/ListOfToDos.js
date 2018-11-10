import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {

    // making a const to keep things tidy
    let toDoArray = this.props.parent_state.toDoList
    // console.log("toDoArray:", toDoArray)



    if (toDoArray.length === 1) {
      return ("")
    }

    // Below we map over the array of list items, and
    // create an unordered list

    return (
      <div className='todolist'>


        <ul>


       {/*   {toDoArray.map((listitem, index) => {    */}
          {toDoArray.map((todoobject) => {
            return (

                <li key={todoobject.id}>

                  <button id={todoobject.id}
                          type="button"
                          className="close"
                          value={todoobject.todoitem}
                          onClick={this.props.onClickRemoveItem}>&times;</button>

                          {todoobject.todoitem}

                </li>

            )
          })}


        </ul>


      </div>
    );
  }
}
