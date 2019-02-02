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
    };

 // This binding is necessary to make `this` work in the callback
    this.axiosGetToDos = this.axiosGetToDos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.axiosPostNewToDo = this.axiosPostNewToDo.bind(this);
    this.axiosDeleteToDo = this.axiosDeleteToDo.bind(this);
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
  //  GET
  //  ==================================================================
    axiosGetToDos() {
      axios.get(this.state.dataSource)

        .then( (response) => {
      console.log("Hello from get", response.data)
        // First, map over toDoArray to add a displayStrikethrough boolean
        // to each todo item. (To keep track of whether item has been scratched out)
        const toDoArray = response.data.map( (element) => {
          // TODO: problem with this approach is that when you get the list
          // of todos, you're replacing the old list, which may have items already
          // scratched out.
          element["displayStrikethrough"] = false
          return element
        })
          this.setState({toDoList: toDoArray})

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
  //  POST
  //  ==================================================================
    axiosPostNewToDo() {
      console.log("Hello from post")

      axios.post(this.state.dataSource, {
        todoitem: this.state.newToDo
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
  //  DELETE
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
  //  Strikethrough line
  //  ==================================================================
   handleAddStrikethrough(index) {
     console.log("handleAddStrikethrough click with index of:", index)

  //  1) create a const of toDoListArray to keep things tidy
     let toDoListArray = this.state.toDoList

  //  2) take the index number of the TODO item that's been clicked, pluck
  //  it out of the toDoListArray(not literally), call that the selectedToDoItem
     let selectedToDoItem = toDoListArray[index]

  //  3) Toggle the displayStrikethrough boolean with !
     selectedToDoItem["displayStrikethrough"] = !selectedToDoItem.displayStrikethrough
     toDoListArray[index] = selectedToDoItem

  //  4) Set the state with the *updated* array, that has the new information
    this.setState({toDoList: toDoListArray})

   };



//  ==================================================================
//  And finally, the render
//  ==================================================================
  render() {
    return (
      <div className="App red-line">

       <Header />

       <Form parentState={this.state}
             newTodo={this.state}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}/>

       <ListOfToDos parentState={this.state}
                    handleClickRemoveItem={this.handleClickRemoveItem}
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}
                    handleAddStrikethrough={this.handleAddStrikethrough}
                    />


       <Footer />

      </div>
    );
  }
}
