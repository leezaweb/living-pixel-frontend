import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import * as actions from "./actions";
import { connect } from "react-redux";

class BodyCast extends Component {
  render() {
    let { body_style } = this.props.activeSite.body;
    let style = {};
    for (const [key, value] of Object.entries(body_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }

    return (
      <div className="art-board" style={style}>
        <Header header={this.props.activeSite.header} />
        <Main sections={this.props.activeSite.sections} />
        <Footer footer={this.props.activeSite.footer} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSite: state.activeSite
});

export default connect(mapStateToProps, actions)(BodyCast);
