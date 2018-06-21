import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";

class Organism extends Component {
  render() {
    return (
      <div
        className="box"
        data-id={this.props.id}
        data-type={"organism"}
        data-site={this.props.activeSiteId}
        onClick={() =>
          this.props.cloneOrganism({
            site: this.props.activeSiteId,
            key: this.props.id
          })
        }
      >
        <span className="child">
          {/*  <i className="fa fa-object-ungroup" />
          <br />
          {this.props.title}*/}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSiteId: state.activeSite.id
});

export default connect(mapStateToProps, actions)(Organism);
