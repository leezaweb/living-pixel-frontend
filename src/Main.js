import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";
import { Parallax } from "react-spring";

class Main extends Component {
  componentDidUpdate() {
    let sections = [...document.querySelectorAll("section")];

    sections.forEach(section => {
      // let section = document.querySelector(s);
      let id = section.dataset.id;
      let allChildren = [...section.getElementsByTagName("*")];
      allChildren.forEach(child => {
        child.classList.add(`section-${id}`);
        child.setAttribute("data-id", id);
      });
    });

    let images = [...document.querySelectorAll("img")];
    images.forEach(image => {
      // debugger;
      if (image.naturalWidth > image.naturalHeight) {
        image.style.width = "100%";
        image.style.height = "auto";
      } else {
        image.style.width = "100%";
        image.style.height = "auto";
      }
    });
  }
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

              if (camelKey === "minHeight") {
                sectionStyle[camelKey] = value / 12 + "vw";
              } else if (camelKey.includes("Width")) {
                sectionStyle[camelKey] = value / 12 + "vw";
              } else {
                sectionStyle[camelKey] = value;
              }
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
                      if (camelKey === "gridRowStart") {
                        elementStyle[camelKey] = value + 1;
                      } else if (camelKey === "gridRowEnd") {
                        elementStyle[camelKey] = value + 1;
                      } else if (
                        camelKey === "gridColumnStart" &&
                        value === 0
                      ) {
                        elementStyle[camelKey] = value + 1;
                      } else if (
                        camelKey === "gridColumnEnd" &&
                        value < 12 &&
                        elementStyle.gridColumnStart === 1
                      ) {
                        elementStyle[camelKey] = value + 1;
                      } else if (camelKey === "columnGap") {
                        elementStyle[camelKey] = value / 12 + "vw";
                      } else if (camelKey.includes("Width")) {
                        elementStyle[camelKey] = value / 12 + "vw";
                      } else {
                        elementStyle[camelKey] = value;
                      }
                      if (
                        !camelKey.includes("border") &&
                        !camelKey.includes("grid")
                      ) {
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
