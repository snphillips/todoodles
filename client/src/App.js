import React, { Component } from 'react';
import axios from 'axios';
// import _lodash from 'lodash';
import Header from './Header';
import Introduction from './Introduction';
import Form from './Form';
import ListOfToDos from './ListOfToDos';
// import DeleteButton from './DeleteButton';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "http://localhost:8888/todos",
      // dataSource: "https://todoodles-app.herokuapp.com",
      // isLoading: false,
      user: '', //not using but might add auth in future
      toDoList: [ ],
      newToDo: '',
      selectedToDelete: '',
    };

 // This binding is necessary to make `this` work in the callback
    this.axiosGetToDos = this.axiosGetToDos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.axiosPostNewToDo = this.axiosPostNewToDo.bind(this);
    this.onClickRemoveItem = this.onClickRemoveItem.bind(this);
    this.axiosDeleteToDo = this.axiosDeleteToDo.bind(this);
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
      axios.get(this.state.dataSource)
        .then( (response) => {

          // console.log("response.data from the server:", response.data)
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
     console.log("The event.target.value is:", event.target.value)
     this.setState({newToDo: event.target.value})
    };

  //  ==================================================================
  //  When the button is clicked, the axios POST call is made
  //  ==================================================================
    handleSubmit(event) {
      event.preventDefault();
      console.log("submit button clicked")
      this.axiosPostNewToDo();
    }

  //  ==================================================================
  //  POST -
  //  ==================================================================
    axiosPostNewToDo() {
      axios.post(this.state.dataSource, {
        todoitem: this.state.newToDo
      })
      .then(function (response) {
        // this not logging
        console.log("hello from response");
        console.log("response from axiosPostNewToDo:", response);
        // this not triggering a get
        this.axiosGetToDos();
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //  ==================================================================
  //  Delete buttons (x)
  //  NOT WORKING PROPERLY
  //  ==================================================================
    onClickRemoveItem(event) {
      event.preventDefault();
      console.log("onClickRemoveItem clicked. Item to delete:", event.target.id);
      this.setState({selectedToDelete: event.target.id})
      console.log("this.state.selectedToDelete is:" , this.state.selectedToDelete)
      this.axiosDeleteToDo();
    }



  //  ==================================================================
  //  axios DELETE
  //  ==================================================================
    axiosDeleteToDo() {
      // console.log("selectedToDelete:", this.state.selectedToDelete)
      // axios.delete(this.state.dataSource + `${id}`, {
      axios.delete(this.state.dataSource + `/${this.state.selectedToDelete}`, {
        todoitem: this.state.selectedToDelete
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }



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
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}/>




      </div>
    );
  }
}
