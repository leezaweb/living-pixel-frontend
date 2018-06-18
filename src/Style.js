import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { COLORS } from "./Colors";
class Style extends Component {
  handleChange = (key, name, value, element) => {
    // document.querySelector(".styleForm input[type=file]").files
    // let file = this.fileUpload.files[0];
    // debugger;
    if (this.fileUpload) {
      var self = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.fileUpload.files[0]);
      reader.onload = () => {
        self.props.updateElement({
          element: element,
          background_image: reader.result
        });
      };
    } else {
      this.props.updateElement({
        key: key,
        name: name,
        value: value,
        element: element
      });
    }
  };

  handleHover = e => {
    e.target.focus();
  };

  render() {
    if (this.props.activeElement.element_style)
      console.log(
        "NEW PROPS",
        this.props.activeElement.element_style.grid_column_end
      );

    const BORDERS = [
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
      "none"
    ];

    const FILTERS = [
      "none",
      "blur(5px)",
      "brightness(200%)",
      "contrast(200%)",
      "grayscale(100%)",
      "hue-rotate(90deg)",
      "invert(100%)",
      "saturate(8)",
      "sepia(100%)"
    ];

    const BACK_REPEAT = [
      "repeat-x",
      "repeat-y",
      "repeat",
      "no-repeat",
      "round",
      "space"
    ];
    const BACK_SIZE = ["contain", "cover"];
    const BACK_ATTACH = [
      "url('https://www.w3schools.com/css/img_tree.gif') center / 10% fixed",
      "url('https://www.w3schools.com/css/img_tree.gif') center / 10% scroll"
    ];

    const ALIGN = ["left", "right", "center", "justify"];

    let labelsFields;
    let key;
    if (this.props.activeElement) {
      key = Object.keys(this.props.activeElement).find(key =>
        key.includes("_style")
      );
      labelsFields = Object.entries(this.props.activeElement[key]).map(
        (k, v) => {
          if (!k[0].includes("_id") && k[0] !== "id") {
            return typeof k[1] === "number" ? (
              <label key={v}>
                <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                <br />
                <input
                  style={{ width: 80 }}
                  type="number"
                  defaultValue={this.props.activeElement[key][k[0]]}
                  name={k[0]}
                  onChange={event => {
                    event.persist();
                    this.handleChange(
                      key,
                      k[0],
                      event.target.value,
                      this.props.activeElement
                    );
                  }}
                />
              </label>
            ) : typeof k[1] === "string" ? (
              k[0].includes("color") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    className="selectColor"
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {COLORS.map(color => (
                      <option
                        key={color}
                        style={{
                          backgroundColor: color,
                          color: color
                        }}
                        value={color}
                      >
                        &nbsp;
                      </option>
                    ))}
                  </select>
                </label>
              ) : k[0].includes("style") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    className="selectBorder"
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {BORDERS.map(border => {
                      return (
                        <option
                          key={border}
                          style={{
                            backgroundColor: "#d4d4d4",
                            borderStyle: border,
                            color: "white"
                          }}
                          value={border}
                        >
                          &nbsp;
                        </option>
                      );
                    })}
                  </select>
                </label>
              ) : k[0].includes("background_image") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <input
                    accept="image/*"
                    type="file"
                    defaultValue={""}
                    name={k[0]}
                    ref={ref => (this.fileUpload = ref)}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                  />
                </label>
              ) : k[0].includes("filter") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    style={{
                      backgroundImage:
                        "url('https://www.w3schools.com/css/img_tree.gif')",
                      backgroundSize: "contain"
                    }}
                    multiple
                  >
                    {FILTERS.map(filter => (
                      <option
                        key={filter}
                        style={{
                          outline: "1px solid #444",
                          backdropFilter: filter
                        }}
                        value={filter}
                      >
                        {filter}
                      </option>
                    ))}
                  </select>
                </label>
              ) : k[0].includes("align") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {ALIGN.map(align => (
                      <option
                        key={align}
                        style={{
                          textAlign: align
                        }}
                        value={align}
                      >
                        {align}
                      </option>
                    ))}
                  </select>
                </label>
              ) : k[0].includes("repeat") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {BACK_REPEAT.map(repeat => (
                      <option
                        key={repeat}
                        style={{
                          backgroundImage:
                            "url('https://www.w3schools.com/css/img_tree.gif')",
                          backgroundRepeat: repeat,
                          backgroundSize: "20% 20%"
                        }}
                        value={repeat}
                      >
                        {repeat}
                      </option>
                    ))}
                  </select>
                </label>
              ) : k[0].includes("size") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {BACK_SIZE.map(size => (
                      <option
                        key={size}
                        style={{
                          backgroundImage:
                            "url('https://www.w3schools.com/css/img_tree.gif')",
                          backgroundSize: size
                        }}
                        value={size}
                      >
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
              ) : k[0].includes("attach") ? (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <select
                    onMouseOver={this.handleHover}
                    defaultValue={[this.props.activeElement[key][k[0]]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                    multiple
                  >
                    {BACK_ATTACH.map(attach => {
                      let a = attach.replace(
                        "url('https://www.w3schools.com/css/img_tree.gif') center / 10%",
                        ""
                      );
                      return (
                        <option
                          key={a}
                          defaultValue={[this.props.activeElement[key][k[0]]]}
                          style={{
                            background: attach
                          }}
                          value={a}
                        >
                          {a}
                        </option>
                      );
                    })}
                  </select>
                </label>
              ) : (
                <label key={v}>
                  <span>{`${k[0].replace(/_/g, " ")}`}:</span>
                  <br />
                  <input
                    type="text"
                    size="3"
                    defaultValue={this.props.activeElement[key][k[0]]}
                    name={k[0]}
                    onChange={event => {
                      event.persist();
                      this.handleChange(
                        key,
                        k[0],
                        event.target.value,
                        this.props.activeElement
                      );
                    }}
                  />
                </label>
              )
            ) : null;
          } else {
            return null;
          }
        }
      );
    }

    return (
      <div>
        <form className="styleForm">{labelsFields}</form>
        {/*this.props.activeElement.tag === "img" ? (
          <label>
            <span>
              IMAGE <br />URL
            </span>
            <input type="text" size="25" style={{ fontSize: "1.8em" }} />
          </label>
        ) : null*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({ activeElement: state.activeElement });

export default connect(mapStateToProps, actions)(Style);
