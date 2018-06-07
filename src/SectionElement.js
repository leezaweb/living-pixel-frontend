import React, { Component } from "react";
import Element from "./Element";
import GridLayout from "react-grid-layout";

class SectionElement extends Component {
  render() {
    let { elements } = this.props;

    var layout = elements.map((element, i) => {
      return { i: element.id, x: i * 4, y: i * 4, w: 2, h: 2 };
    });

    return (
      <GridLayout className="layout" layout={layout} cols={12} width={600}>
        {elements.map(
          element =>
            element.tag === "img" ? (
              <div key={element.id.toString()}>
                <img src={element.src} alt="" />
              </div>
            ) : (
              <p key={element.id.toString()}>{element.inner_text}</p>
            )
        )}
      </GridLayout>
    );
  }
}

export default SectionElement;
