import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import * as actions from "./actions";
import { connect } from "react-redux";

class Main extends Component {
  render() {
    const figures = Array(48).fill("<div>Section > Figure</div>");

    return (
      <main key="main">
        {/*<section
          className="section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 8%)",
            gridTemplateRows: "repeat(4,1fr)",
            placeContent: "space-around"
          }}
          dangerouslySetInnerHTML={{ __html: figures.join("") }}
        />*/}

        {this.props.sections
          .sort((a, b) => a.sequence - b.sequence)
          .map((section, sectionIndex) => {
            let sectionStyle = {};
            for (const [key, value] of Object.entries(section.section_style)) {
              let camelKey = key
                .split("_")
                .map(
                  (w, i) =>
                    i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
                )
                .join("");
              sectionStyle[camelKey] = value;
            }

            var layout = section.elements.map((element, elementIndex) => {
              return {
                i: element.id.toString(),
                x: elementIndex * 12 / section.elements.length,
                y: sectionIndex * 2,
                w: 12 / section.elements.length,
                h: 1
              };
            });

            return (
              <section
                style={sectionStyle}
                onClick={event => this.props.onClick(event, section)}
                key={section.id}
              >
                <GridLayout
                  layout={layout}
                  cols={12}
                  width={600}
                  rowHeight={600}
                >
                  {section.elements.map(element => {
                    let elementStyle = {};
                    for (const [key, value] of Object.entries(
                      element.element_style
                    )) {
                      let camelKey = key
                        .split("_")
                        .map(
                          (w, i) =>
                            i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
                        )
                        .join("");
                      elementStyle[camelKey] = value;
                    }

                    return element.tag === "img" ? (
                      <div key={element.id.toString()}>
                        <img
                          key={element.id.toString()}
                          style={elementStyle}
                          src={element.src}
                          alt=""
                          onClick={event => this.props.onClick(event, element)}
                        />
                      </div>
                    ) : (
                      <p
                        style={elementStyle}
                        key={element.id.toString()}
                        onClick={event => this.props.onClick(event, element)}
                      >
                        {element.inner_text}
                      </p>
                    );
                  })}
                </GridLayout>
              </section>
            );
          })}
      </main>
    );
  }
}

export default connect(null, actions)(Main);
