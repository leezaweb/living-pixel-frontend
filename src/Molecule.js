import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";

class Molecule extends Component {
  render() {
    return (
      <div
        className="box"
        data-id={this.props.id}
        data-type={"molecule"}
        data-site={this.props.activeSiteId}
        draggable="true"
        onDragEnd={e => this.props.dragEnd(e)}
        onDragStart={e => this.props.dragStart(e)}
      >
        <span className="child">
          <i className="fa fa-object-ungroup" />
          <br />
          {this.props.title}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSiteId: state.activeSite.id
});

export default connect(mapStateToProps, actions)(Molecule);
