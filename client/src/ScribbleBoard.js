import React, { Component } from 'react';
import Drawing from './Drawing';


// Immutable.js
import Immutable from 'immutable';



export default class ScribbleBoard extends Component {
  constructor() {
    super();

    this.state = {
      isDrawing: false,
      lines: Immutable.List(),
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }

componentDidMount() {
  document.addEventListener("mouseup", this.handleMouseUp);
}
componentWillUnmount() {
  document.removeEventListener("mouseup", this.handleMouseUp);
}



/*==============================
 handleMouseDown
================================*/
  handleMouseDown(mouseEvent) {
  console.log("mouse down")
  if (mouseEvent.button !== 0) {
    return;
  }

  const point = this.relativeCoordinatesForEvent(mouseEvent);

  this.setState(prevState => {
    return {
      lines: prevState.lines.push(Immutable.List([point])),
      isDrawing: true,
    };
  });
}

relativeCoordinatesForEvent(mouseEvent) {
  const boundingRect = this.refs.drawArea.getBoundingClientRect();
  return new Immutable.Map({
    x: mouseEvent.clientX - boundingRect.left,
    y: mouseEvent.clientY - boundingRect.top,
  });
}


/*==============================
 handleMouseMove
================================*/
handleMouseMove(mouseEvent) {
  console.log("mouse move")
  if (!this.state.isDrawing) {
    return;
  }

  const point = this.relativeCoordinatesForEvent(mouseEvent);

  this.setState(prevState => {
    return {
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
    };
  });
}



handleMouseUp() {
  this.setState({ isDrawing: false });
}



/*==============================
 Finally, the render!
================================*/
render() {
  return(

    <span className="drawArea"
          ref="drawArea"
          onMouseDown={this.props.handleMouseDown}
          onMouseMove={this.props.handleMouseMove}
          >

      <Drawing lines={this.state.lines} />

    </span>
  )
}
}
