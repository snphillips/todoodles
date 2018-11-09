import React, { Component } from 'react';

export default class DeleteButton extends Component {
  render() {
    return (

      <form type="submit"
            onSubmit={this.props.handleSubmitDelete}>

      </form>

    );
  }
}
