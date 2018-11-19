import React, { Component } from 'react';


export default class ListOfToDos extends Component {
  render() {


    // State
    let toDoArray = this.props.parent_state.toDoList

    // if (toDoArray.length === 1) {
    //   return ("")
    // }

    // Below we map over the array of list items, and
    // create an unordered list

    return (
      <div className='todolist'>


        <ul>

          {toDoArray.map( (todoobject) => {

            return (

              <li key={todoobject.id}>

                <div className="canvas"
                     // onMouseDown={this.props.draw}
                     >

                  <button id={todoobject.id}
                          type="button"
                          className="delete-x"
                          value={todoobject.todoitem}
                          onClick={this.props.onClickRemoveItem}>&times;</button>

                    <form className="todo-item-form"
                          onSubmit={this.props.axiosPutToDo}
                          >

                      <input id={todoobject.id}
                             todoitem={todoobject.todoitem}
                             className="todo-item"
                             value={todoobject.todoitem}
                             onChange={this.props.onChangeEditItem}
                             >

                      </input>

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

                             // value={
                             //  this.setState({value: todoobject.todoitem})
                             // }

                             // onChange={ (event) => {
                             //    this.props.onChangeEditItem(event.target.value)
                             //  }}

                          // <span id={todoobject.id}
                                // className="todo-item"
                                // value={todoobject.todoitem}
                                // onClick={this.props.onClickEditItem}>{todoobject.todoitem}</span>






