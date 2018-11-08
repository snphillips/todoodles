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
      dataSource: "http://localhost:8888/todos/",
      // dataSource: "https://todoodles-app.herokuapp.com",
      toDoList: ['']
    };

 // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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


    handleSubmit(event) {
      event.preventDefault();
      const newToDo = event.target.value;
      console.log(this.newToDo)
      console.log('event.target.value is :', event.target.value)
      console.log("button clicked")

      axios.post(this.state.dataSource + `/createToDo`, {
        todoitem: newToDo,
      })
      .then(function (response) {
        console.log(response);
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
       <Form handleSubmit={this.handleSubmit}/>
       <ListOfToDos parent_state={this.state}
                    toDoList={this.state}
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}/>


      </div>
    );
  }
}


