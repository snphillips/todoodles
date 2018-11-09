import React, { Component } from 'react';

export default class DeleteButton extends Component {
  render() {
    return (

      <div>


        <input
          className="button"
          type="submit"
          value="delete"
          onClick={this.props.handleSubmitDelete}
        />


      </div>


    );
  }
}
