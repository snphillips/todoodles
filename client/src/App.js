import React, { Component } from 'react';
import axios from 'axios';
import { fabric } from "fabric";
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
  }



  //  ==================================================================
  //  1) Once React has mounted and is ready...
  //  2) fire the axios GET requset (the axiosGetToDos function)
  //  ==================================================================
    componentDidMount() {
      console.log("the data source URL is:", this.state.dataSource)
      this.axiosGetToDos();
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
//  And finally, the render
//  ==================================================================
  render() {

  //  ==================================================================
  //  The drawing part
  // http://jsfiddle.net/ghostoy/wTmFE/1/
  //  ==================================================================
    let canvas = new fabric.Canvas('canvas');
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = "#04067d";
    console.log("canvas", canvas);







    return (


      <div>


        <section id="todoodles" className="red-line">

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
           />

           <Footer />

        </section>
        <canvas
          id="canvas"
          width="1000px"
          height="1000px"
        />
      </div>
    );
  }
}
