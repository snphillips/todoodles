import React, { Component } from 'react';
import axios from 'axios';
// import _lodash from 'lodash';
import Header from './Header';
import Introduction from './Introduction';
import Form from './Form';
import ListOfToDos from './ListOfToDos';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "http://localhost:8888/todos",
      // dataSource: "https://todoodles-app.herokuapp.com",
      toDoList: [ ],
      newToDo: '',
      selectedToDelete: '',
      selectedToEdit: '',
    };

 // This binding is necessary to make `this` work in the callback
    this.axiosGetToDos = this.axiosGetToDos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.axiosPostNewToDo = this.axiosPostNewToDo.bind(this);
    this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
    this.axiosDeleteToDo = this.axiosDeleteToDo.bind(this);
    this.onChangeEditItem = this.onChangeEditItem.bind(this);
    this.axiosPutToDo = this.axiosPutToDo.bind(this);
  }

  //  ==================================================================
  //  1) Once React has mounted and is ready...
  //  2) fire the axios GET requset, which is the axiosGetToDos function
  //  ==================================================================
    componentDidMount() {
      this.axiosGetToDos();
    }

  //  ==================================================================
  //  axios GET requset
  //  ==================================================================
    axiosGetToDos() {
      console.log("Hello from get")
      axios.get(this.state.dataSource)
        .then( (response) => {

          this.setState({toDoList: response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  //  ==================================================================
  //  As soon as the user interacts with the form newTodo updates.
  //  The API call happens once the user clicks the 'submit' button.
  //  ==================================================================
   handleChange(event) {
     // console.log("The event.target.value is:", event.target.value)
     this.setState({newToDo: event.target.value})
    };

  //  ==================================================================
  //  When the button is clicked, the axios POST call is made
  //  ==================================================================
    handleSubmit(event) {
      event.preventDefault();
      // console.log("submit button clicked")
      this.axiosPostNewToDo( () => {
        this.axiosGetToDos()
      });
    }

  //  ==================================================================
  //  POST -
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
  //  DELETE (via the "x" buttons)
  //  ==================================================================
    onClickRemoveItem(event) {
      event.preventDefault();
      console.log("onClickRemoveItem clicked. Item to delete:", event.target.id);
      this.setState({selectedToDelete: event.target.id}, () => {
         console.log("this.state.selectedToDelete is:" , this.state.selectedToDelete)
         this.axiosDeleteToDo();
      })
    }


  //  ==================================================================
  //  axios DELETE
  //  ==================================================================
    axiosDeleteToDo() {
      console.log("Hello from axios DELETE!", this.state.selectedToDelete, "will be deleted.")
      // axios.delete(this.state.dataSource + `${id}`, {
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
  // axios PUT (update/edit)
  //  ==================================================================
    onChangeEditItem(event) {
      event.preventDefault();
      console.log(`Item to edit has an id of:` + event.target.id + `and value of:` + event.target.value);
      this.setState({selectedToEdit: event.target.id})
    }


  //  ==================================================================
  //  axios PUT (update/edit)
  //  ==================================================================
    axiosPutToDo() {
      console.log("Hello from axios PUT", this.state.selectedToEdit, "will be edited.")
      // axios.delete(this.state.dataSource + `${id}`, {
      axios.put(this.state.dataSource + `/${this.state.selectedToEdit}`, {
        todoitem: this.state.selectedToEdit
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
  //  Canvas Drawing
  //  ==================================================================

  // draw() {
  //   console.log("hello from Draw")
  //   let i
  //   for (i = 0; i<8000; i++) {
  //     let canvas = document.querySelector(".canvas")
  //     let square= document.createElement('div')
  //     square.setAttribute('class', "square")
  //     canvas.appendChild(square)
  //     square.addEventListener("mouseover", function (colorChange){
  //        colorChange.target.style.backgroundColor = "black";
  //      })
  // }};




//  ==================================================================
//  And finally, the render
//  ==================================================================
  render() {
    return (
      <div className="App">

       <Header />

       <Introduction />

       <Form parent_state={this.state}
             newTodo={this.state}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}/>

       <ListOfToDos parent_state={this.state}
                    toDoList={this.state}
                    onClickRemoveItem={this.onClickRemoveItem}
                    onChangeEditItem={this.onChangeEditItem}
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}
                    axiosPutToDo={this.axiosPutToDo}
                    draw={this.draw}/>





      </div>
    );
  }
}
       // <Canvas />
