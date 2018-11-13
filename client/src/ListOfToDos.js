import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {

    // making a const to keep things tidy
    let toDoArray = this.props.parent_state.toDoList
    // console.log("toDoArray:", toDoArray)



    // if (toDoArray.length === 1) {
    //   return ("")
    // }

    // Below we map over the array of list items, and
    // create an unordered list

    return (
      <div className='todolist'>


        <ul>


       {/*   {toDoArray.map((listitem, index) => {    */}
          {toDoArray.map((todoobject) => {
            return (

              <li key={todoobject.id}>

                <div className="canvas"
                     onMouseDown={this.props.draw}
                     >


                  <button id={todoobject.id}
                          type="button"
                          className="close"
                          value={todoobject.todoitem}
                          onClick={this.props.onClickRemoveItem}>&times;</button>


                    <form className="todo-item-form"
                          onSubmit={this.props.axiosPutToDo}>

                      <input id={todoobject.id}
                             todoitem={todoobject.todoitem}
                             className="todo-item"
                             value={todoobject.todoitem}
                             onChange={this.props.onChangeEditItem}></input>

                    </form>

                </div>
              </li>
            )
          })}


        </ul>


      </div>
    );
  }
}


                          // <span id={todoobject.id}
                                // className="todo-item"
                                // value={todoobject.todoitem}
                                // onClick={this.props.onClickEditItem}>{todoobject.todoitem}</span>






