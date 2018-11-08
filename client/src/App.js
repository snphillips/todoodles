import React, { Component } from 'react';
import axios from 'axios';
import _lodash from 'lodash';
import Header from './Header';
import AddToDoForm from './AddToDoForm';
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

  }




    componentDidMount() {
      axios.get(this.state.dataSource)
        .then( (response) => {
          // iterate over the response, adding each item to the doDoList array
          console.log(response.data)
          this.setState({toDoList: response.data[5].todoitem})

          let toDoList = response.data[5].todoitem
          console.log(toDoList)
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
       <ListOfToDos parent_state={this.state}
                    toDoList={this.state}
                    axiosAllToDosFromAPI={this.axiosAllToDosFromAPI}/>



      </div>
    );
  }
}


