import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor, RichUtils } from "draft-js";

class MainEdit extends Component {
  onChange = (editorState, element) => {
    let key;
    if (element) {
      key = Object.keys(element).find(key => key.includes("_style"));
    }
    this.props.updateElement({
      editorState: editorState,
      element: element,
      key: key
    });
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  onBoldClick(element) {
    this.onChange(
      RichUtils.toggleInlineStyle(element.editorState, "BOLD"),
      element
    );
  }

  onItalicClick(element) {
    this.onChange(
      RichUtils.toggleInlineStyle(element.editorState, "ITALIC"),
      element
    );
  }

  onCodeClick(element) {
    this.onChange(
      RichUtils.toggleInlineStyle(element.editorState, "CODE"),
      element
    );
  }

  render() {
    return (
      <main className="editing">
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
              <section
                style={sectionStyle}
                onMouseDown={event => this.props.onMouseDown(event, section)}
                key={section.id}
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
                    <div
                      style={elementStyle}
                      onDoubleClick={event =>
                        this.props.onDoubleClick(event, element)
                      }
                      onMouseDown={event =>
                        this.props.onMouseDown(event, element)
                      }
                    >
                      <img
                        className="element"
                        key={element.id.toString()}
                        src={element.src}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className="element"
                      key={element.id.toString()}
                      style={elementStyle}
                      onDoubleClick={event =>
                        this.props.onDoubleClick(event, element)
                      }
                      onMouseDown={event =>
                        this.props.onMouseDown(event, element)
                      }
                    >
                      <ul className="buttons">
                        <li>
                          <span>STYLE:</span>
                        </li>
                        <li>
                          <button onClick={() => this.onBoldClick(element)}>
                            Bold
                          </button>
                        </li>
                        <li>
                          <button onClick={() => this.onItalicClick(element)}>
                            Italic
                          </button>
                        </li>
                        <li>
                          <button onClick={() => this.onCodeClick(element)}>
                            Code
                          </button>
                        </li>
                      </ul>

                      <Editor
                        handleKeyCommand={this.handleKeyCommand}
                        editorState={element.editorState}
                        onChange={e => this.onChange(e, element)}
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
