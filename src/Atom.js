import React, { Component } from "react";
import Draggable, { DraggableCore } from "react-draggable";

class Atom extends Component {
  constructor() {
    super();
    this.state = {
      controlledPosition: {
        x: 0,
        y: 0
      }
    };
  }

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    return (
      <Draggable
        grid={[96, 96]}
        position={controlledPosition}
        {...dragHandlers}
        onDrag={this.onControlledDrag}
      >
        <div className="box">
          <i className="fa fa-object-ungroup" />Atom
        </div>
      </Draggable>
    );
  }
}

export default Atom;
