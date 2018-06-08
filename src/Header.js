import React, { Component } from "react";

class Header extends Component {
  render() {
    let { header_style, inner_text } = this.props.header;
    let style = {};
    for (const [key, value] of Object.entries(header_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }
    return (
      <header style={style} onClick={this.props.onClick}>
        <h1>{inner_text}</h1>
      </header>
    );
  }
}

export default Header;
