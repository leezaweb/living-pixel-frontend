import React, { Component } from "react";

class Footer extends Component {
  render() {
    let { footer_style, inner_text } = this.props.footer;
    let style = {};
    for (const [key, value] of Object.entries(footer_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }
    return (
      <footer style={style} onClick={this.props.onClick}>
        <h5>{inner_text}</h5>
      </footer>
    );
  }
}

export default Footer;
