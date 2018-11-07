import React, { Component } from 'react';
import Header from './Header';
import Today from './Today';
// import ThisWeek from './ThisWeek';
// import ThisMonth from './ThisMonth';
// import Sometime from './Sometime';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todayList: ["feed cat", "shower"],
      thisWeekList: ["grocery shopping", "laundry"],
      thisMonthList: ["make dental apointment", "paint wall"],
      sometimeList: ["pay taxes", "clean fridge"],
    };

    // This binding is necessary to make `this` work in the callback
  this.addItemToday = this.addItemToday.bind(this);
  // this.addItemThisWeek = this.addItemThisWeek.bind(this);
  // this.addItemThisMonth = this.addItemThisMonth.bind(this);
  // this.addItemSometime = this.addItemSometime.bind(this);
}

addItemToday(e) {
    if (this._inputElement.value !== "") {
    var newItem = {
      text: this._inputElement.value,
      key: Date.now()
    };

    this.setState((prevState) => {
      return {
        todayList: prevState.todayList.concat(newItem)
      };
    });

    this._inputElement.value = "";
  }

  console.log(this.state.todayList);

  e.preventDefault();

}



  onInputChange(event) {
    console.log(event.target.value);
    this.setState({newToDo: event.target.value})
  }

  onFormSubmit(event) {
  // event.preventDefault(); tells the browser, "don't submit form"
  event.preventDefault();
  // clears the search field after submit
  this.setState({newToDo: ''});
  }






  render() {
    return (
      <div className="App">
        <Header />
        <Today parent_state={this.state}/>
      </div>
    );
  }
}
        // <ThisWeek parent_state={this.state}/>
        // <ThisMonth parent_state={this.state}/>
        // <Sometime parent_state={this.state}/>
