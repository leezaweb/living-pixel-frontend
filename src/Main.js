import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor, EditorState, ContentState } from "draft-js";

class Main extends Component {
  constructor(props) {
    super(props);

    let editorSections = this.props.sections.map(section => {
      let elems = section.elements.map(element => {
        if (element.inner_text) {
          return {
            ...element,
            editorState: EditorState.createWithContent(
              ContentState.createFromText(element.inner_text)
            )
          };
        } else {
          return element;
        }
      });

      return { ...section, elements: elems };
    });
    console.log(editorSections);

    this.state = {
      editorSections: editorSections,
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Hello")
      )
    };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const figures = Array(48).fill("<div>Section > Figure</div>");

    return (
      <main>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Asdasd"
        />
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

        {this.state.editorSections
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
              console.log(element.id);
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
                    // debugger;

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
                        <Editor
                          editorState={this.state.editorState}
                          onChange={this.onChange}
                          placeholder="Asdasd"
                        />
                        <Editor
                          editorState={element.editorState}
                          onChange={this.onChange}
                        />
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
