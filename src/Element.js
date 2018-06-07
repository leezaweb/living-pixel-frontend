import React, { Component } from "react";

class Element extends Component {
  render() {
    let { element_property, inner_text, tag, src } = this.props.element;
    let style = {};
    // for (const [key, value] of Object.entries(component_property)) {
    //   let camelKey = key
    //     .split("_")
    //     .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    //     .join("");
    //   style[camelKey] = value;
    // }
    return (
      <div style={style}>
        {tag === "img" ? <img src={src} alt="" /> : inner_text}
      </div>
    );
  }
}

export default Element;
