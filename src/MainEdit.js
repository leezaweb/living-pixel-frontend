import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor, EditorState, ContentState } from "draft-js";

class MainEdit extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      stateRef: null,
      editorSections: this.mapPropsToState(),
      editorState: EditorState.createWithContent(
        ContentState.createFromText("Hello")
      )
    };
  }

  onChange = editorState => {
    let editorSections = this.state.editorSections.map(section => {
      let elems = section.elements.map(element => {
        if (element.id === this.props.activeElement.id) {
          let text = element.editorState
            ? element.editorState.getCurrentContent().getPlainText()
            : "";
          console.log(text[text.length - 1]);

          return {
            ...element,
            editorState: editorState
          };
        } else {
          return element;
        }
      });

      return { ...section, elements: elems };
    });

    this.setState({ editorSections: editorSections });
  };

  mapPropsToState = () => {
    return this.props.sections.map(section => {
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
  };

  render() {
    console.log(this.state.editorSections);

    return (
      <main class="editing">
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

            return (
              <section style={sectionStyle} key={section.id}>
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
                    <div
                      onMouseOver={event =>
                        this.props.onMouseDown(event, element)
                      }
                    >
                      <img
                        className="element"
                        key={element.id.toString()}
                        style={elementStyle}
                        src={element.src}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className="element"
                      key={element.id.toString()}
                      style={elementStyle}
                      onMouseOver={event =>
                        this.props.onMouseDown(event, element)
                      }
                    >
                      <Editor
                        editorKey={element.id}
                        editorState={element.editorState}
                        onChange={this.onChange}
                      />
                    </div>
                  );
                })}
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

export default connect(mapStateToProps, actions)(MainEdit);

// {/*<section
//   className="section"
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, 8%)",
//     gridTemplateRows: "repeat(4,1fr)",
//     placeContent: "space-around"
//   }}
//   dangerouslySetInnerHTML={{ __html: figures.join("") }}
// />*/}
