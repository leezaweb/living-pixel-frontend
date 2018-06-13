import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor } from "draft-js";

class HeaderEdit extends Component {
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

  render() {
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
      <header style={style}>
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
  activeElement: state.activeElement
});

export default connect(mapStateToProps, actions)(HeaderEdit);
