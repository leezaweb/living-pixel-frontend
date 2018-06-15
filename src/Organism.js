import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";

class Organism extends Component {
  render() {
    return (
      <div
        className="box"
        data-id={"i am a hero image with caption"}
        draggable="true"
        onDragEnd={e => this.props.dragEnd(e)}
        onDragStart={e => this.props.dragStart(e)}
      >
        <i className="fa fa-object-ungroup" />Organism
      </div>
    );
  }
}

export default connect(null, actions)(Organism);
