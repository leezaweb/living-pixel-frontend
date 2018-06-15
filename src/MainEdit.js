import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor, RichUtils } from "draft-js";
import Dropzone from "react-dropzone";
import { CirclePicker } from "react-color";
import { COLORS } from "./Colors";

class MainEdit extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }
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

  onRemoveItem(element) {
    this.props.deleteElement({ element: element });
  }
  onCloneItem(element) {
    this.props.cloneElement({ element: element });
  }

  onDrop(files) {
    console.log(files);
    this.setState(
      {
        files
      },
      () => console.log(this.state)
    );
  }

  handleDoubleClick = event => {
    this.setState({
      pickerLeft: event.pageX - 25,
      pickerTop: event.pageY - 100,
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  handleChangeComplete = color => {
    console.log(color);
  };

  render() {
    const colorPicker = (
      <div
        style={{
          position: "absolute",
          left: this.state.pickerLeft,
          top: this.state.pickerTop
        }}
      >
        <CirclePicker
          colors={COLORS}
          width={150}
          circleSize={14}
          circleSpacing={7}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
    return (
      <main className="editing">
        {this.state.displayColorPicker ? colorPicker : null}

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
                onClick={event => this.props.onMouseDown(event, section)}
                onDoubleClick={this.handleDoubleClick}
                key={section.id}
              >
                <div>
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
                        key={element.id.toString()}
                        style={{
                          ...elementStyle,
                          position: "relative",
                          overflow: "hidden"
                        }}
                        onDoubleClick={event =>
                          this.props.onDoubleClick(event, element)
                        }
                        onMouseDown={event =>
                          this.props.onMouseDown(event, element)
                        }
                      >
                        <img className="element" src={element.src} alt="" />
                        <Dropzone
                          onDrop={this.onDrop.bind(this)}
                          style={{ border: "none" }}
                        >
                          <i className="fa fa-upload" />
                        </Dropzone>
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

                        <span
                          className="icon-left fa fa-trash remove"
                          onClick={this.onRemoveItem.bind(this, element)}
                        />
                        <span
                          className="icon-left fa fa-clone copy"
                          onClick={this.onCloneItem.bind(this, element)}
                        />
                        <Editor
                          handleKeyCommand={this.handleKeyCommand}
                          editorState={element.editorState}
                          onChange={e => this.onChange(e, element)}
                        />
                      </div>
                    );
                  })}
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

export default connect(mapStateToProps, actions)(MainEdit);
