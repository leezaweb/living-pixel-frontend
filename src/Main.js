import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";
import { Parallax } from "react-spring";

class Main extends Component {
  render() {
    return (
      <main>
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

            return (
              <section style={sectionStyle} key={section.id}>
                <div>
                  {/*<div
                  onLayoutChange={this.onLayoutChange}
                  layout={layout}
                  cols={12}
                  width={930}
                  rowHeight={300}
                >*/}
                  {section.elements.map(element => {
                    let elementStyle = {};
                    let elementStyleSansBorders = {};
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
                      if (camelKey === "gridColumnStart" && value === 0) {
                        elementStyle[camelKey] = value + 1;
                      } else {
                        elementStyle[camelKey] = value;
                      }
                      if (!camelKey.includes("border")) {
                        elementStyleSansBorders[camelKey] = value;
                      }
                    }

                    return element.tag === "h2" ? (
                      <h2
                        className="element"
                        style={elementStyle}
                        key={element.id.toString()}
                      >
                        <span
                          style={elementStyleSansBorders}
                          dangerouslySetInnerHTML={{
                            __html: draftToHtml(JSON.parse(element.inner_text))
                          }}
                        />
                      </h2>
                    ) : element.tag === "h3" ? (
                      <h3
                        className="element"
                        style={elementStyle}
                        key={element.id.toString()}
                      >
                        <span
                          style={elementStyleSansBorders}
                          dangerouslySetInnerHTML={{
                            __html: draftToHtml(JSON.parse(element.inner_text))
                          }}
                        />
                      </h3>
                    ) : element.tag === "h4" ? (
                      <h4
                        className="element"
                        style={elementStyle}
                        key={element.id.toString()}
                      >
                        <span
                          style={elementStyleSansBorders}
                          dangerouslySetInnerHTML={{
                            __html: draftToHtml(JSON.parse(element.inner_text))
                          }}
                        />
                      </h4>
                    ) : element.tag === "img" ? (
                      <div
                        key={element.id.toString()}
                        style={{
                          ...elementStyle,
                          overflow: "hidden"
                        }}
                      >
                        <img className="element" src={element.src} alt="" />
                      </div>
                    ) : (
                      <p
                        className="element"
                        style={elementStyle}
                        key={element.id.toString()}
                      >
                        <span
                          style={elementStyleSansBorders}
                          dangerouslySetInnerHTML={{
                            __html: draftToHtml(JSON.parse(element.inner_text))
                          }}
                        />
                      </p>
                    );
                  })}
                  {/*</div>*/}
                </div>
              </section>
            );
          })}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.activeSite.sections,
  activeElement: state.activeElement
});

export default connect(mapStateToProps, actions)(Main);

// let item = this.props.sections
// .map(section => section.elements)
// .find(item => item.i === this.props.activeElement.id);
