import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor } from "draft-js";
import { CirclePicker } from "react-color";
import { COLORS } from "./Colors";

class HeaderEdit extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      displayColorPicker: false,
      pickerLeft: null,
      pickerTop: null
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
    this.setState({ value: editorState });
  };

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
        <h1
          style={elementStyleSansBorders}
          onDoubleClick={event =>
            this.props.onDoubleClick(event, this.props.header)
          }
          onMouseDown={event =>
            this.props.onMouseDown(event, this.props.header)
          }
        >
          <Editor
            editorState={this.props.header.editorState}
            onChange={e => this.onChange(e, this.props.header)}
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

export default connect(mapStateToProps, actions)(HeaderEdit);
