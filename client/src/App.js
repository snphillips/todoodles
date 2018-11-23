import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
// import ScribbleBoard from './ScribbleBoard';
// import Introduction from './Introduction';
import Form from './Form';
import ListOfToDos from './ListOfToDos';
import Footer from './Footer';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "http://localhost:8888/todos",
      // dataSource: "https://todoodles-app.herokuapp.com",
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
      this.axiosGetToDos();
    }

  //  ==================================================================
  //  GET
  //  ==================================================================
    axiosGetToDos() {
      console.log("Hello from get")
      axios.get(this.state.dataSource)
        .then( (response) => {
        // First, map over toDoArray to add a displayStrikethrough boolean
        const toDoArray = response.data.map((element)=>{
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
  //  Strike-through line
  //  ==================================================================
   handleAddStrikethrough(index) {

       console.log("handleAddStrikethrough")
       console.log(index)
       const myArray = this.state.toDoList

        let myObject = myArray[index]
        // debugger
        myObject["displayStrikethrough"] = !myObject.displayStrikethrough
        myArray[index] = myObject

        this.setState({toDoList: myArray})

   };








//  ==================================================================
//  And finally, the render
//  ==================================================================
  render() {
    return (
      <div className="App">

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
       // <Introduction />
       // <ScribbleBoard />
