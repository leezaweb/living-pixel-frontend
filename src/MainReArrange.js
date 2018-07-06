import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import * as actions from "./actions";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";
import Dropzone from "react-dropzone";
import { CirclePicker } from "react-color";
import { COLORS } from "./Colors";

class MainReArrange extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      displayColorPicker: false,
      pickerLeft: null,
      pickerTop: null
    };
  }
  _crop = () => {
    const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    console.log(dataUrl);
  };

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

  onLayoutChange = (layout, layouts) => {
    if (
      this.props.activeElement &&
      "element_style" in this.props.activeElement
    ) {
      let item = layout.find(
        item => item.i === this.props.activeElement.id.toString()
      );

      if (item) {
        this.props.updateElementGrid({
          key: "element_style",
          grid_column_start: item.x,
          grid_column_end: item.x + item.w,
          grid_row_start: item.y,
          grid_row_end: item.y + item.h,
          element: this.props.activeElement
        });
      }
    }
  };

  onRemoveItem(element) {
    this.props.deleteElement({ element: element });
  }
  onCloneItem(element) {
    this.props.cloneElement({ element: element });
  }

  componentDidMount() {
    console.log("mount");
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
        image.style.width = "90%";
        image.style.height = "auto";
      } else {
        image.style.height = "50%";
        image.style.width = "auto";
      }
    });
  }

  componentDidUpdate() {
    console.log("update");
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

  handleDoubleClick = event => {
    this.setState({
      pickerLeft: event.pageX - 25,
      pickerTop: event.pageY - 100,
      displayColorPicker: !this.state.displayColorPicker
    });
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
          onChangeComplete={event =>
            this.props.handleChangeComplete(event, this.props.activeElement)
          }
        />
      </div>
    );
    return (
      <main className="re-arranging">
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

            var layout = section.elements.map((element, elementIndex) => {
              return {
                i: element.id.toString(),
                x: element.element_style.grid_column_start,
                y: element.element_style.grid_row_start,
                w:
                  element.element_style.grid_column_end -
                  element.element_style.grid_column_start,
                h:
                  element.element_style.grid_row_end -
                  element.element_style.grid_row_start
              };
            });

            return (
              <section
                onDragEnd={e => this.props.dragEnd(e)}
                onDragStart={e => this.props.dragStart(e)}
                data-type={"section"}
                data-site={this.props.activeSiteId}
                style={sectionStyle}
                onClick={event => this.props.onClick(event, section)}
                onDoubleClick={this.handleDoubleClick}
                key={section.id}
                onDragOver={e => this.props.dragOver(e)}
                data-id={section.id}
                className={`section-${section.id}`}
              >
                <div data-id={section.id} className={`section-${section.id}`}>
                  <GridLayout
                    onLayoutChange={this.onLayoutChange}
                    layout={layout}
                    cols={12}
                    width={875}
                    data-id={section.id}
                    className={`section-${section.id}`}
                  >
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
                              i === 0
                                ? w
                                : w.charAt(0).toUpperCase() + w.slice(1)
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
                      // debugger;
                      return element.tag === "h2" ? (
                        <div
                          data-grid={{
                            x: element.grid_column_start,
                            y: element.grid_row_start,
                            w:
                              element.grid_column_end -
                              element.grid_column_start,
                            h: element.grid_row_end - element.grid_row_start
                          }}
                          style={elementStyle}
                          key={element.id.toString()}
                          onDoubleClick={(event, element) =>
                            this.props.onDoubleClick(event, element)
                          }
                          onMouseDown={event =>
                            this.props.onMouseDown(event, element)
                          }
                          onClick={event =>
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
                                onMouseDown={this.onCloneItem.bind(
                                  this,
                                  element
                                )}
                              />
                            </span>
                          ) : null}

                          <h2
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                JSON.parse(element.inner_text)
                              )
                            }}
                          />
                        </div>
                      ) : element.tag === "h3" ? (
                        <div
                          data-grid={{
                            x: element.grid_column_start,
                            y: element.grid_row_start,
                            w:
                              element.grid_column_end -
                              element.grid_column_start,
                            h: element.grid_row_end - element.grid_row_start
                          }}
                          style={elementStyle}
                          key={element.id.toString()}
                          onDoubleClick={(event, element) =>
                            this.props.onDoubleClick(event, element)
                          }
                          onMouseDown={event =>
                            this.props.onMouseDown(event, element)
                          }
                          onClick={event =>
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
                                onMouseDown={this.onCloneItem.bind(
                                  this,
                                  element
                                )}
                              />
                            </span>
                          ) : null}

                          <h3
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                JSON.parse(element.inner_text)
                              )
                            }}
                          />
                        </div>
                      ) : element.tag === "h4" ? (
                        <div
                          data-grid={{
                            x: element.grid_column_start,
                            y: element.grid_row_start,
                            w:
                              element.grid_column_end -
                              element.grid_column_start,
                            h: element.grid_row_end - element.grid_row_start
                          }}
                          style={elementStyle}
                          key={element.id.toString()}
                          onDoubleClick={(event, element) =>
                            this.props.onDoubleClick(event, element)
                          }
                          onMouseDown={event =>
                            this.props.onMouseDown(event, element)
                          }
                          onClick={event =>
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
                                onMouseDown={this.onCloneItem.bind(
                                  this,
                                  element
                                )}
                              />
                            </span>
                          ) : null}

                          <h4
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                JSON.parse(element.inner_text)
                              )
                            }}
                          />
                        </div>
                      ) : element.tag === "img" ? (
                        <div
                          key={element.id.toString()}
                          data-grid={{
                            x: element.grid_column_start,
                            y: element.grid_row_start,
                            w:
                              element.grid_column_end -
                              element.grid_column_start,
                            h: element.grid_row_end - element.grid_row_start
                          }}
                          style={elementStyleSansBorders}
                          onDoubleClick={(event, element) =>
                            this.props.onDoubleClick(event, element)
                          }
                          onMouseDown={event =>
                            this.props.onMouseDown(event, element)
                          }
                          onClick={event =>
                            this.props.onMouseDown(event, element)
                          }
                        >
                          {this.props.activeElement &&
                          this.props.activeElement.id === element.id ? (
                            <span className="clone-delete">
                              <span
                                className="icon-left fa fa-trash remove"
                                onClick={this.onRemoveItem.bind(this, element)}
                              />
                              <span
                                className="icon-left fa fa-clone copy"
                                onClick={this.onCloneItem.bind(this, element)}
                              />
                            </span>
                          ) : null}

                          <img
                            style={elementStyle}
                            className={`element section-${section.id}`}
                            data-id={section.id}
                            src={element.src}
                            alt=""
                          />
                          <Dropzone
                            onDrop={event =>
                              this.onDrop.bind(this)(event, element)
                            }
                            style={{ border: "none" }}
                            accept="image/jpeg, image/jpg, image/png, image/gif, image/svg"
                          >
                            <i className="fa fa-upload" />
                          </Dropzone>
                        </div>
                      ) : (
                        <div
                          data-grid={{
                            x: element.grid_column_start,
                            y: element.grid_row_start,
                            w:
                              element.grid_column_end -
                              element.grid_column_start,
                            h: element.grid_row_end - element.grid_row_start
                          }}
                          style={elementStyle}
                          key={element.id.toString()}
                          onDoubleClick={(event, element) =>
                            this.props.onDoubleClick(event, element)
                          }
                          onMouseDown={event =>
                            this.props.onMouseDown(event, element)
                          }
                          onClick={event =>
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
                                onMouseDown={this.onCloneItem.bind(
                                  this,
                                  element
                                )}
                              />
                            </span>
                          ) : null}

                          <div
                            className="content"
                            dangerouslySetInnerHTML={{
                              __html: draftToHtml(
                                JSON.parse(element.inner_text)
                              )
                            }}
                          />
                        </div>
                      );
                    })}
                  </GridLayout>
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

export default connect(mapStateToProps, actions)(MainReArrange);
