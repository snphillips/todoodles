import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Form from './Form';
import ListOfToDos from './ListOfToDos';
import Footer from './Footer';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "https://todoodles-server.herokuapp.com/todos",
      // dataSource: "http://localhost:8888/todos",
      toDoList: [ ],
      newToDo: '',
      selectedToDelete: '',
      selectedToToggleStrikethrough: '',
      toDoItemDomArray: [],
      toDoItemBoxArray: []
    };

 // This binding is necessary to make `this` work in the callback
    this.axiosGetToDos = this.axiosGetToDos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.axiosPostNewToDo = this.axiosPostNewToDo.bind(this);
    this.axiosDeleteToDo = this.axiosDeleteToDo.bind(this);
    this.axiosPutToDo = this.axiosPutToDo.bind(this);
    this.handleClickRemoveItem = this.handleClickRemoveItem.bind(this);
    this.handleAddStrikethrough = this.handleAddStrikethrough.bind(this);
    this.doodleCanvas = this.doodleCanvas.bind(this);
  }
  // end of constructor
  // ***************************




  //  ==================================================================
  //  1) Once React has mounted and is ready...
  //  2) fire the axios GET request (the axiosGetToDos function)
  //  ==================================================================
    componentDidMount() {
      // console.log("the data source URL is:", this.state.dataSource)
      this.axiosGetToDos();
      this.doodleCanvas();
    }



  //  ==================================================================
  //  GET - RESTfull API call
  //  ==================================================================
    axiosGetToDos() {
      axios.get(this.state.dataSource)

        .then( (response) => {
          console.log("Hello from get", response.data)
          // First, map over toDoArray to add a displaystrikethrough boolean
          // to each todo item. (To keep track of whether item has been scratched out)
          // const toDoArray = response.data.map( (element) => {
          // TODO: problem with this approach is that when you get the list
          // of todos, you're replacing the old list, which may have items already
          // scratched out.
          // element["displaystrikethrough"] = false
          // return element
        // })
          // this.setState({toDoList: toDoArray})
          this.setState({toDoList: response.data})

        })
        .catch(function (error) {
          console.log(error);
        });
    }

  //  ==================================================================
  //  POST
  //  As soon as the user interacts with the form, newTodo updates.
  //  The API call happens once the user clicks the 'submit' button.
  //  ==================================================================
   handleChange(event) {
     // console.log("The event.target.value is:", event.target.value)
     this.setState({newToDo: event.target.value})
    };

  //  ==================================================================
  //  POST
  //  When the user hits "enter" (or the submit button is clicked), the
  //  axios POST requset is made.
  //  Note we then follow up with a GET request, to fetch the list again,
  //  which now includes our *new* todo item at the bottom of the list.
  //  ==================================================================
    handleSubmit(event) {
      event.preventDefault();
      this.axiosPostNewToDo( () => {
        this.axiosGetToDos()
      });
      // event.target.reset() clears the form once the item has been submitted
      event.target.reset();
    }

  //  ==================================================================
  //  POST - RESTfull API call
  //  ==================================================================
    axiosPostNewToDo() {
      console.log("Hello from post")

      axios.post(this.state.dataSource, {
        todoitem: this.state.newToDo,
        displaystrikethrough: false
      })
      .then(function (response) {
        // console.log(response);
      })
      .then( () => {
        this.axiosGetToDos()
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //  ==================================================================
  //  DELETE
  //  (via the "x" buttons next to every TODO item)
  //  ==================================================================
    handleClickRemoveItem(event) {
      event.preventDefault();
      console.log("handleClickRemoveItem clicked. Item to delete:", event.target.id);
      this.setState({selectedToDelete: event.target.id}, () => {
         // console.log("this.state.selectedToDelete is:" , this.state.selectedToDelete)
         this.axiosDeleteToDo();
      })
    }

  //  ==================================================================
  //  DELETE - RESTfull API call
  //  ==================================================================
    axiosDeleteToDo() {
      console.log("Hello from axios DELETE!", this.state.selectedToDelete, "will be deleted.")

      axios.delete(this.state.dataSource + `/${this.state.selectedToDelete}`, {
        todoitem: this.state.selectedToDelete
      })
      .then(function (response) {
        // console.log(response);
      })
      .then( () => {
        this.axiosGetToDos()
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //  ==================================================================
  //  PUT(Edit) - Strike-through line
  //  ==================================================================
   handleAddStrikethrough(index) {
     console.log("handleAddStrikethrough click with index of:", index)

  //  1) create a const of toDoListArray to keep things tidy
     let toDoListArray = this.state.toDoList

  //  2) take the index number of the TODO item that's been clicked, pluck
  //  it out of the toDoListArray(not literally), call that the selectedToDoItem
     let selectedToDoItem = toDoListArray[index]

  //  3) Toggle the displayStrikethrough boolean with !
  //  For instance, if displaystrikethrough has a value of false,
  //  then the ! will give it a value of true
     selectedToDoItem["displaystrikethrough"] = !selectedToDoItem.displaystrikethrough
     toDoListArray[index] = selectedToDoItem

  //  4) Set the state with the *updated* array, that has the new information
    this.setState({toDoList: toDoListArray})
    this.setState({selectedToToggleStrikethrough: index}, () => {
      this.axiosPutToDo()
    })
   };

  //  ==================================================================
  //  PUT(Edit) - RESTfull API call
  //  ==================================================================
  axiosPutToDo() {
    //  1) create variables to keep things tidy
    let toDoListArray = this.state.toDoList
    let indexToStrikethrough = this.state.selectedToToggleStrikethrough

    console.log("Hello from axios PUT. strikethrough is: ", toDoListArray[indexToStrikethrough].displaystrikethrough )

    // 2) the payload of information that's going to be updated
    axios.put(this.state.dataSource + `/${this.state.selectedToToggleStrikethrough}`, {
      id: toDoListArray[indexToStrikethrough].id,
      todoitem: toDoListArray[indexToStrikethrough].todoitem,
      displaystrikethrough: toDoListArray[indexToStrikethrough].displaystrikethrough
  })
  .then(response => {
    console.log("response in axiosPutToDo", response);
  })
  // .then( () => {
  //   this.axiosGetToDos()
  // })
  .catch(error => {
    console.log(error);
  });

  }


















  //  ==================================================================
  //  The canvas drawing part
  //  Adapted from: http://jsfiddle.net/MartinThoma/vSDTW/2/
  //  ==================================================================
  doodleCanvas() {
    // "use strict";
    const canvas = document.getElementById("canvas");
    let paperWidth = document.getElementById("todoodles").offsetWidth;
    let paperHeight = document.getElementById("todoodles").offsetHeight;


      // // =========================
      // // collision detection
      // // =========================
      // // get 2D context
      //  var context = canvas.getContext('2d');
      //  // var context2 = canvas.getContext('2d');

      // let testBox = {x:40, y:280, width: 250, height: 20 };
      // // let testBox = toDoItemBoxArray[4]
      // console.log("testBox", testBox)

      // // place holders for mouse x,y position
      // var pencilX = 0;
      // var pencilY = 0;

      // // loop
      // setInterval(onTimerTick, 33);

      // // render loop
      // function onTimerTick() {
      //   // clear the canvas
      //   // canvas.width = canvas.width;

      //   // see if a collision happened
      //   var collision = contains(testBox, pencilX, pencilY);
      //   // var collision2 = contains(this.toDoItemBoxArray, pencilX, pencilY);
      //   var color = collision ? "purple" : "blue"

      //   // render out square
      //   context.fillStyle = color;
      //   // context2.fillStyle = color;
      //   context.fillRect (testBox.x,testBox.y,testBox.width,testBox.height);
      //   // context2.fillRect (testBox.x,testBox.y,testBox.width,testBox.height);
      //   }

      //   // update mouse position
      //   canvas.onmousemove = function(e) {
      //       pencilX = e.offsetX;
      //       pencilY = e.offsetY;
      // }

      // // test for collision between an object and a point
      // function contains(target, x, y) {
      //   return (
      //     // left
      //     x >= target.x &&
      //     // right
      //     x <= target.x + target.width &&
      //     // top
      //     y >= target.y &&
      //     // bottom
      //     y <= target.y + target.height
      //          );
      // }










    // the canvas will be the height & width of the window
    // sadly, can't be resized.
    // canvas.width = window.innerWidth;
    canvas.width = paperWidth;
    canvas.width = paperWidth;
    // canvas.height = window.innerHeight;
    canvas.height = paperHeight;
    let context = '';
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    let paint;
    canvas.addEventListener('mousedown', mouseWins);
    canvas.addEventListener('touchstart', touchWins);
    context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.shadowBlur = 1.2;
    context.shadowColor = "#000";
    context.lineJoin = "round";
    context.fillStyle = "#000";
    context.strokeStyle = "#000";
    context.imageSmoothingQuality = "high";
    context.lineCap = "round";
    console.log("context", context);
    console.log("paperWidth", paperWidth)
    console.log("paperHeight", paperHeight)



    /**
     * Add information where the user clicked at.
     * @param {number} x
     * @param {number} y
     * @return {boolean} dragging
     */
    function addClick(x, y, dragging) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
    }


    /**
    * Draw the newly added point.
    * @return {void}
    */
    function drawNew() {
      let i = clickX.length - 1
      if (!clickDrag[i]) {
        if (clickX.length === 0) {
            context.beginPath();
            context.moveTo(clickX[i], clickY[i]);
            context.stroke();
        } else {
            context.closePath();

            context.beginPath();
            context.moveTo(clickX[i], clickY[i]);
            context.stroke();
        }
      } else {
          context.lineTo(clickX[i], clickY[i]);
          context.stroke();
      }
    }

    function mouseDownEventHandler(e) {
      paint = true;
      let x = e.pageX - canvas.offsetLeft;
      let y = e.pageY - canvas.offsetTop;
      if (paint) {
          addClick(x, y, false);
          drawNew();
      }
    }

    function touchstartEventHandler(e) {
      paint = true;
      if (paint) {
        addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
        drawNew();
      }
    }

    function mouseUpEventHandler(e) {
      context.closePath();
      paint = false;
    }

    function mouseMoveEventHandler(e) {
      let x = e.pageX - canvas.offsetLeft;
      let y = e.pageY - canvas.offsetTop;
      if (paint) {
        addClick(x, y, true);
        drawNew();
      }
      console.log("drawing x & y are:", x, y)
    }

    function touchMoveEventHandler(e) {
      if (paint) {
        addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
        drawNew();
      }
    }

    function setUpHandler(isMouseandNotTouch, detectEvent) {
      removeRaceHandlers();
      if (isMouseandNotTouch) {
        canvas.addEventListener('mouseup', mouseUpEventHandler);
        canvas.addEventListener('mousemove', mouseMoveEventHandler);
        canvas.addEventListener('mousedown', mouseDownEventHandler);
        mouseDownEventHandler(detectEvent);
      } else {
        canvas.addEventListener('touchstart', touchstartEventHandler);
        canvas.addEventListener('touchmove', touchMoveEventHandler);
        canvas.addEventListener('touchend', mouseUpEventHandler);
        touchstartEventHandler(detectEvent);
      }
    }

    function mouseWins(e) {
      setUpHandler(true, e);
    }

    function touchWins(e) {
      setUpHandler(false, e);
    }

    function removeRaceHandlers() {
      canvas.removeEventListener('mousedown', mouseWins)
      canvas.removeEventListener('touchstart', touchWins)
    }





    canvas.addEventListener('mousedown', mouseWins);
    canvas.addEventListener('touchstart', touchWins);
  }




//  ==================================================================
//  And finally, the render
//  ==================================================================
  render() {

    return (

      <div id="app">
        <section id="todoodles">
          <span className="red-line"/>
          <div className="content-container">
           <Header />
           <Form
             parentState={this.state}
             newTodo={this.state}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}
            />
           <ListOfToDos
             parentState={this.state}
             handleClickRemoveItem={this.handleClickRemoveItem}
             axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}
             handleAddStrikethrough={this.handleAddStrikethrough}
             toDoItemDomArray={this.state.toDoItemDomArray}
             toDoItemBoxArray={this.state.toDoItemBoxArray}
           />
           </div>
          <canvas id="canvas" width="100" height="100"/>
          <Footer />
        </section>
      </div>
    );
  }
}
