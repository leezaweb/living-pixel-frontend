import React, { Component } from "react";

class Footer extends Component {
  render() {
    let { footer_property, inner_text } = this.props.footer;
    let style = {};
    for (const [key, value] of Object.entries(footer_property)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }
    return (
      <footer style={style}>
        <h5>{inner_text}</h5>
      </footer>
    );
  }
}

export default Footer;
