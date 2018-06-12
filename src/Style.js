import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import _ from "lodash";

class Style extends Component {
  handleChange = (key, name, value, element) => {
    this.props.updateElement({
      key: key,
      name: name,
      value: value,
      element: element
    });
  };

  render() {
    const COLORS = [
      "Black",
      "Navy",
      "DarkBlue",
      "MediumBlue",
      "Blue",
      "DarkGreen",
      "Green",
      "Teal",
      "DarkCyan",
      "DeepSkyBlue",
      "DarkTurquoise",
      "MediumSpringGreen",
      "Lime",
      "SpringGreen",
      "Aqua",
      "Cyan",
      "MidnightBlue",
      "DodgerBlue",
      "LightSeaGreen",
      "ForestGreen",
      "SeaGreen",
      "DarkSlateGray",
      "DarkSlateGrey",
      "LimeGreen",
      "MediumSeaGreen",
      "Turquoise",
      "RoyalBlue",
      "SteelBlue",
      "DarkSlateBlue",
      "MediumTurquoise",
      "Indigo",
      "DarkOliveGreen",
      "CadetBlue",
      "CornflowerBlue",
      "RebeccaPurple",
      "MediumAquaMarine",
      "DimGray",
      "DimGrey",
      "SlateBlue",
      "OliveDrab",
      "SlateGray",
      "SlateGrey",
      "LightSlateGray",
      "LightSlateGrey",
      "MediumSlateBlue",
      "LawnGreen",
      "Chartreuse",
      "Aquamarine",
      "Maroon",
      "Purple",
      "Olive",
      "Gray",
      "Grey",
      "SkyBlue",
      "LightSkyBlue",
      "BlueViolet",
      "DarkRed",
      "DarkMagenta",
      "SaddleBrown",
      "DarkSeaGreen",
      "LightGreen",
      "MediumPurple",
      "DarkViolet",
      "PaleGreen",
      "DarkOrchid",
      "YellowGreen",
      "Sienna",
      "Brown",
      "DarkGray",
      "DarkGrey",
      "LightBlue",
      "GreenYellow",
      "PaleTurquoise",
      "LightSteelBlue",
      "PowderBlue",
      "FireBrick",
      "DarkGoldenRod",
      "MediumOrchid",
      "RosyBrown",
      "DarkKhaki",
      "Silver",
      "MediumVioletRed",
      "IndianRed",
      "Peru",
      "Chocolate",
      "Tan",
      "LightGray",
      "LightGrey",
      "Thistle",
      "Orchid",
      "GoldenRod",
      "PaleVioletRed",
      "Crimson",
      "Gainsboro",
      "Plum",
      "BurlyWood",
      "LightCyan",
      "Lavender",
      "DarkSalmon",
      "Violet",
      "PaleGoldenRod",
      "LightCoral",
      "Khaki",
      "AliceBlue",
      "HoneyDew",
      "Azure",
      "SandyBrown",
      "Wheat",
      "Beige",
      "WhiteSmoke",
      "MintCream",
      "GhostWhite",
      "Salmon",
      "AntiqueWhite",
      "Linen",
      "LightGoldenRodYellow",
      "OldLace",
      "Red",
      "Fuchsia",
      "Magenta",
      "DeepPink",
      "OrangeRed",
      "Tomato",
      "HotPink",
      "Coral",
      "DarkOrange",
      "LightSalmon",
      "Orange",
      "LightPink",
      "Pink",
      "Gold",
      "PeachPuff",
      "NavajoWhite",
      "Moccasin",
      "Bisque",
      "MistyRose",
      "BlanchedAlmond",
      "PapayaWhip",
      "LavenderBlush",
      "SeaShell",
      "Cornsilk",
      "LemonChiffon",
      "FloralWhite",
      "Snow",
      "Yellow",
      "LightYellow",
      "Ivory",
      "White"
    ];

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
                {`${k[0].replace(/_/g, " ")}`}:<br />
                <input
                  style={{ width: 100 }}
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
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
              ) : k[0].includes("filter") ? (
                <label key={v}>
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
              ) : k[0].includes("repeat") ? (
                <label key={v}>
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <select
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
                          selected
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
                  {`${k[0].replace(/_/g, " ")}`}:<br />
                  <input
                    type="text"
                    size="10"
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

    return <form className="styleForm">{labelsFields}</form>;
  }
}

const mapStateToProps = state => ({ activeElement: state.activeElement });

export default connect(mapStateToProps, actions)(Style);
