import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor } from "draft-js";
import { CirclePicker } from "react-color";
import { COLORS } from "./Colors";

class FooterEdit extends Component {
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
    let { footer_style } = this.props.footer;
    let style = {};
    let elementStyleSansBorders = {};
    for (const [key, value] of Object.entries(footer_style)) {
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
      <footer
        style={style}
        onMouseDown={event => this.props.onMouseDown(event, this.props.footer)}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.state.displayColorPicker ? colorPicker : null}
        <h5
          style={elementStyleSansBorders}
          onDoubleClick={event =>
            this.props.onDoubleClick(event, this.props.footer)
          }
          onMouseDown={event =>
            this.props.onMouseDown(event, this.props.footer)
          }
        >
          <Editor
            editorState={this.props.footer.editorState}
            onChange={e => this.onChange(e, this.props.footer)}
          />
        </h5>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  activeElement: state.activeElement,
  footer: state.activeSite.footer
});

export default connect(mapStateToProps, actions)(FooterEdit);
