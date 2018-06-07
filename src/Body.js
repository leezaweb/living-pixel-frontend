import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

class Body extends Component {
  render() {
    let { body_property } = this.props.body;
    let style = {};
    for (const [key, value] of Object.entries(body_property)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }

    return (
      <div className="art-board" style={style}>
        <Header key="header" header={this.props.header} />
        <Main key="main" sections={this.props.sections} />

        <Footer footer={this.props.footer} key="footer" />
      </div>
    );
  }
}

export default Body;
