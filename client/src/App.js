import React, { Component } from 'react';
import axios from 'axios';
// import _lodash from 'lodash';
import Header from './Header';
import Form from './Form';
import ListOfToDos from './ListOfToDos';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "http://localhost:8888/todos",
      // dataSource: "https://todoodles-app.herokuapp.com",
      user: '',
      toDoList: [''],
      newToDo: '',
      selectedToDo: '',
    };

 // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.axiosPostNewToDo = this.axiosPostNewToDo.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    this.axiosDeleteToDo = this.axiosDeleteToDo.bind(this);
  }

  //  ==================================================================
  //  axios GET requset. Note this is wrapped in a componentDidMount...
  //  We need the initial list to render as soon as React is ready.
  //  ==================================================================
    componentDidMount() {
      axios.get(this.state.dataSource)
        .then( (response) => {

          let toDoListResponseData = response.data
          console.log("original toDoListData;", toDoListResponseData)

          // mapping over toDoListData array to find the list items only
          let toDoListArray = toDoListResponseData.map((i) => i.todoitem);
          console.log("toDoListArray:", toDoListArray)
          this.setState({toDoList: toDoListArray})
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
     const newToDoItem = event.target.value
     console.log("The event.target.value is:", event.target.value)
     this.setState({newToDo: event.target.value})
    };

  //  ==================================================================
  //  When the button is clicked, the axios POST call is made
  //  ==================================================================
    handleSubmit(event) {
      event.preventDefault();
      this.axiosPostNewToDo();
      // this.refreshToDoList();
      console.log("Hello from handleSubmit")
    }

  //  ==================================================================
  //  axios POST
  //  ==================================================================
    axiosPostNewToDo() {
      axios.post(this.state.dataSource, {
        todoitem: this.state.newToDo

      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //  ==================================================================
  //  axios DELETE
  //  ==================================================================
    axiosDeleteToDo() {
      axios.delete(this.state.dataSource, {
        todoitem: this.state.selectedToDo

      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  //  ==================================================================
  //  Delete button
  //  ==================================================================
    handleSubmitDelete() {
      // event.preventDefault();
      this.axiosDeleteToDo();
      console.log("Hello from handleSubmitDelete")
    }

    refreshToDoList() {
      this.setState({ toDoList: this.toDoListArray })
    }


//  ==================================================================
//  And finally, the render
//  ==================================================================
  render() {
    return (
      <div className="App">

       <Header />

       <Form parent_state={this.state}
             newTodo={this.state}
             handleChange={this.handleChange}
             handleSubmit={this.handleSubmit}/>

       <ListOfToDos parent_state={this.state}
                    toDoList={this.state}
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}/>


      </div>
    );
  }
}

