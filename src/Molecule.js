import React, { Component } from "react";

class Molecule extends Component {
  render() {
    return (
      <div
        className="box"
        data-id={"i am a hero image with caption"}
        draggable="true"
        onDragEnd={e => this.props.dragEnd(e)}
        onDragStart={e => this.props.dragStart(e)}
      >
        <i className="fa fa-object-ungroup" />Molecule
      </div>
    );
  }
}

export default Molecule;
