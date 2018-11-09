import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {

    // making a const to keep things tidy
    let toDoArray = this.props.parent_state.toDoList
    console.log("toDoArray:", toDoArray)



    if (toDoArray.length === 1) {
      return ("")
    }

    // Below we map over the array of list items, and
    // create an unordered list

    return (
      <div className='todolist'>

        <ul>

          {toDoArray.map((listitem, index) => {
            return (

              <li key={index}>

                <button type="button"
                        className="close"
                        value={listitem}
                        onClick={this.props.onClickRemoveItem}>&times;</button>

                        {listitem}

              </li>
            )
          })}

        </ul>

      </div>
    );
  }
}
