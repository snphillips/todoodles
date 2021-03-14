import React, { Component } from 'react';






export default class ListOfToDos extends Component {



    componentDidMount() {

    // get all the list items
    let toDoItemHTMLCollection = document.getElementsByTagName("li");

    // After a thousandth of a second,
    // create an array out of the HTML collection
    setInterval( () => {

      let toDoItemDomArray = Array.from( toDoItemHTMLCollection );
      console.log("toDoItemDomArray", toDoItemDomArray)

      let toDoItemBoxArray = [];

      toDoItemDomArray.map( (toDoItem, index) => {

        toDoItem.style.background = "pink";

        let toDoItemX = toDoItem.offsetLeft;
        let toDoItemY = toDoItem.offsetTop;
        let toDoItemWidth = toDoItem.offsetWidth;
        let toDoItemHeight = toDoItem.offsetHeight;

        let toDoBox = {
          toDoItem: index,
          x: toDoItemX,
          y: toDoItemY,
          width: toDoItemWidth,
          height: toDoItemHeight - 4
        }
        console.log("toDoBox item:", index, toDoBox)

        toDoItemBoxArray.push(toDoBox)
        console.log("toDoItemBoxArray", toDoItemBoxArray)

        this.setState({toDoItemDomArray: toDoItemDomArray})
      })

      }, 1000);
    }

  render() {


    // To keep things more readable
    let toDoArray = this.props.parentState.toDoList


    // Below we map over the array of list items, and
    // create an unordered list
    return (
      <div className='todolist'>


        <ul>
          {toDoArray.map( (toDoObject, index) => {

            // Here's where we add the className to add the strikethrough css, if
            // the user clicks an item. (see handleAddStrikethrough on App.js)
            let className = 'todo-item';
              if (toDoObject.displaystrikethrough === true) {
                className += ' strikethrough';
            }

            return (
              <li
                key={index}
                // key={toDoObject.id}
                className="todo-list-item"
              >
                  <button
                    id={toDoObject.id}
                    type="button"
                    className="delete-x"
                    value={toDoObject.todoitem}
                    onClick={this.props.handleClickRemoveItem}>&times;</button>

                  <span
                    key={index}
                    id={toDoObject.id}
                    className={className}
                    // Have to pass index number, therefore must be a callback
                    onClick={ ()=>{this.props.handleAddStrikethrough(index)}  }
                    >
                     {toDoObject.todoitem}
                  </span>
              </li>
            )
          })}
        </ul>
      </div>
    );




  }
}




