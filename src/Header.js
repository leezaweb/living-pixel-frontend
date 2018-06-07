import React, { Component } from "react";

class Header extends Component {
  render() {
    let { header_property, inner_text } = this.props.header;
    let style = {};
    for (const [key, value] of Object.entries(header_property)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }
    return (
      <header style={style}>
        <h1>{inner_text}</h1>
      </header>
    );
  }
}

export default Header;
