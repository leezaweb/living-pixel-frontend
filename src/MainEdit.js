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

  onDrop(file, element) {
    if (file) {
      var self = this;
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        self.props.updateElement({
          element: element,
          src: reader.result
        });
      };
    }
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

  handleDoubleClick = event => {
    this.setState({
      pickerLeft: event.pageX - 25,
      pickerTop: event.pageY - 100,
      displayColorPicker: !this.state.displayColorPicker
    });
  };

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
          onChangeComplete={event =>
            this.props.handleChangeComplete(event, this.props.activeElement)
          }
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
              if (camelKey === "minHeight") {
                sectionStyle[camelKey] = value / 12 + "vw";
              } else {
                sectionStyle[camelKey] = value;
              }
            }

            return (
              <section
                draggable="true"
                onDragEnd={e => this.props.dragEnd(e)}
                onDragStart={e => this.props.dragStart(e)}
                data-type={"section"}
                data-site={this.props.activeSiteId}
                style={sectionStyle}
                onDoubleClick={this.handleDoubleClick}
                key={section.id}
                onDragOver={e => this.props.dragOver(e)}
                data-id={section.id}
                className={`section-${section.id}`}
              >
                <div>
                  {section.elements.map(element => {
                    let elementStyle = {};
                    let elementStyleSansBorders = {};
                    let elementGridStyle = {};

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
                      if (!camelKey.includes("grid")) {
                        if (camelKey === "columnGap") {
                          elementStyle[camelKey] = value / 12 + "vw";
                        } else if (camelKey.includes("Width")) {
                          elementStyle[camelKey] = value / 12 + "vw";
                        } else {
                          elementStyle[camelKey] = value;
                        }
                      } else if (camelKey.includes("grid")) {
                        if (camelKey === "gridRowStart") {
                          console.log(camelKey, value);
                          elementGridStyle[camelKey] = value + 1;
                          elementStyleSansBorders[camelKey] = value + 1;
                          console.log(
                            elementGridStyle[camelKey],
                            elementStyleSansBorders[camelKey]
                          );
                        } else if (camelKey === "gridRowEnd") {
                          elementGridStyle[camelKey] = value + 1;
                          elementStyleSansBorders[camelKey] = value + 1;
                        } else if (camelKey === "gridColumnStart") {
                          elementGridStyle[camelKey] = value + 1;
                          elementStyleSansBorders[camelKey] = value + 1;
                        } else if (camelKey === "gridColumnEnd") {
                          elementGridStyle[camelKey] = value + 1;
                          elementStyleSansBorders[camelKey] = value + 1;
                        }
                      } else if (!camelKey.includes("border")) {
                        elementStyleSansBorders[camelKey] = value;
                      }
                    }
                    console.log(elementStyleSansBorders);

                    return element.tag === "h2" ? (
                      <h2
                        className="element"
                        key={element.id.toString()}
                        style={{ ...elementStyle, ...elementGridStyle }}
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
                        {this.props.activeElement &&
                        this.props.activeElement.id === element.id ? (
                          <span className="clone-delete">
                            <span
                              className="icon-left fa fa-trash remove"
                              onMouseDown={this.onRemoveItem.bind(
                                this,
                                element
                              )}
                            />
                            <span
                              className="icon-left fa fa-clone copy"
                              onMouseDown={this.onCloneItem.bind(this, element)}
                            />
                          </span>
                        ) : null}
                        <Editor
                          handleKeyCommand={this.handleKeyCommand}
                          editorState={element.editorState}
                          onChange={e => this.onChange(e, element)}
                        />
                      </h2>
                    ) : element.tag === "h3" ? (
                      <h3
                        className="element"
                        key={element.id.toString()}
                        style={{ ...elementStyle, ...elementGridStyle }}
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
                        {this.props.activeElement &&
                        this.props.activeElement.id === element.id ? (
                          <span className="clone-delete">
                            <span
                              className="icon-left fa fa-trash remove"
                              onMouseDown={this.onRemoveItem.bind(
                                this,
                                element
                              )}
                            />
                            <span
                              className="icon-left fa fa-clone copy"
                              onMouseDown={this.onCloneItem.bind(this, element)}
                            />
                          </span>
                        ) : null}
                        <Editor
                          handleKeyCommand={this.handleKeyCommand}
                          editorState={element.editorState}
                          onChange={e => this.onChange(e, element)}
                        />
                      </h3>
                    ) : element.tag === "h4" ? (
                      <h4
                        className="element"
                        key={element.id.toString()}
                        style={{ ...elementStyle, ...elementGridStyle }}
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
                        {this.props.activeElement &&
                        this.props.activeElement.id === element.id ? (
                          <span className="clone-delete">
                            <span
                              className="icon-left fa fa-trash remove"
                              onMouseDown={this.onRemoveItem.bind(
                                this,
                                element
                              )}
                            />
                            <span
                              className="icon-left fa fa-clone copy"
                              onMouseDown={this.onCloneItem.bind(this, element)}
                            />
                          </span>
                        ) : null}
                        <Editor
                          handleKeyCommand={this.handleKeyCommand}
                          editorState={element.editorState}
                          onChange={e => this.onChange(e, element)}
                        />
                      </h4>
                    ) : element.tag === "img" ? (
                      <div
                        key={element.id.toString()}
                        style={{
                          ...elementStyleSansBorders
                        }}
                        onDoubleClick={event =>
                          this.props.onDoubleClick(event, element)
                        }
                        onMouseDown={event =>
                          this.props.onMouseDown(event, element)
                        }
                      >
                        {this.props.activeElement &&
                        this.props.activeElement.id === element.id ? (
                          <span className="clone-delete">
                            <span
                              className="icon-left fa fa-trash remove"
                              onMouseDown={this.onRemoveItem.bind(
                                this,
                                element
                              )}
                            />
                            <span
                              className="icon-left fa fa-clone copy"
                              onMouseDown={this.onCloneItem.bind(this, element)}
                            />
                          </span>
                        ) : null}
                        <img
                          className="element"
                          src={element.src}
                          alt=""
                          style={elementStyle}
                        />
                        <Dropzone
                          onDrop={event =>
                            this.onDrop.bind(this)(event, element)
                          }
                          style={{ border: "none" }}
                        >
                          <i className="fa fa-upload" />
                        </Dropzone>
                      </div>
                    ) : (
                      <div
                        className="element"
                        key={element.id.toString()}
                        style={{ ...elementStyle, ...elementGridStyle }}
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
                        {this.props.activeElement &&
                        this.props.activeElement.id === element.id ? (
                          <span className="clone-delete">
                            <span
                              className="icon-left fa fa-trash remove"
                              onMouseDown={this.onRemoveItem.bind(
                                this,
                                element
                              )}
                            />
                            <span
                              className="icon-left fa fa-clone copy"
                              onMouseDown={this.onCloneItem.bind(this, element)}
                            />
                          </span>
                        ) : null}
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
