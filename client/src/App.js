import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import AddToDoForm from './AddToDoForm';
import ListOfToDos from './ListOfToDos';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: "http://localhost:8888/todos/",
      // dataSource: "https://todoodles-app.herokuapp.com",

    };

 // This binding is necessary to make `this` work in the callback
    this.axiosAllToDosFromAPI = this.axiosAllToDosFromAPI.bind(this)
  }


  axiosAllToDosFromAPI() {
    axios.get(this.state.dataSource)
      .then( (response) => {
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
       <AddToDoForm />
       <ListOfToDos axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}/>
      </div>
    );
  }
}


