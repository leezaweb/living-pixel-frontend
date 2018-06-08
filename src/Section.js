import React, { Component } from "react";
import Element from "./Element";

class Section extends Component {
  render() {
    let { section_style, elements } = this.props.section;
    let style = {};
    for (const [key, value] of Object.entries(section_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }

    return (
      <section
        className="section"
        key={this.props.section.id.toString()}
        style={style}
      >
        {elements.map(element => (
          <Element key={element.id} element={element} />
        ))}
      </section>
    );
  }
}

export default Section;
