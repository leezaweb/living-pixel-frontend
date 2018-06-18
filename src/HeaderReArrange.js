import React, { Component } from "react";
import draftToHtml from "draftjs-to-html";
import { CirclePicker } from "react-color";
import { connect } from "react-redux";
import * as actions from "./actions";

import { COLORS } from "./Colors";

class HeaderReArrange extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      displayColorPicker: false,
      pickerLeft: null,
      pickerTop: null
    };
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
    let { header_style } = this.props.header;
    let style = {};
    let elementStyleSansBorders = {};
    for (const [key, value] of Object.entries(header_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
      if (!camelKey.includes("border")) {
        elementStyleSansBorders[camelKey] = value;
      }
    }
    return (
      <header
        style={style}
        onMouseDown={event => this.props.onMouseDown(event, this.props.header)}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.state.displayColorPicker ? colorPicker : null}

        <h1 style={elementStyleSansBorders}>
          <span
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(this.props.header.inner_text))
            }}
          />
        </h1>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  activeElement: state.activeElement,
  header: state.activeSite.header
});

export default connect(mapStateToProps, actions)(HeaderReArrange);
