import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";
import { Editor } from "draft-js";

class FooterEdit extends Component {
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
      <footer style={style}>
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
  activeElement: state.activeElement
});

export default connect(mapStateToProps, actions)(FooterEdit);
