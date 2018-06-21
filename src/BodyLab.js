import React, { Component } from "react";
import HeaderReArrange from "./HeaderReArrange";
import HeaderEdit from "./HeaderEdit";
import FooterEdit from "./FooterEdit";
import MainEdit from "./MainEdit";
import MainReArrange from "./MainReArrange";
import FooterReArrange from "./FooterReArrange";
import * as actions from "./actions";
import { connect } from "react-redux";

class BodyLab extends Component {
  componentDidUpdate() {
    if (this.props.activeElement) {
      let tab = document.querySelector(".ui-tabview-selected");
      if (tab) {
        tab.classList.remove("ui-tabview-selected", "ui-state-active");
      }
    }
  }
  render() {
    let { body_style } = this.props.body;
    let style = {};
    for (const [key, value] of Object.entries(body_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
    }

    return this.props.editing ? (
      <div className="art-board" style={style}>
        <HeaderEdit
          onMouseDown={(event, section) => {
            this.props.selectElement(section);
          }}
          onDoubleClick={(event, element) =>
            this.props.updateEditing(event, element, !this.props.editing)
          }
        />
        <MainEdit
          onDoubleClick={(event, element) => {
            /*this.props.updateEditing(event, element, !this.props.editing)*/
          }}
          onMouseDown={(event, element) => {
            event.stopPropagation();
            this.props.selectElement(element);
          }}
        />
        <FooterEdit
          onMouseDown={(event, section) => {
            this.props.selectElement(section);
          }}
          onDoubleClick={(event, element) => {
            this.props.updateEditing(event, element, !this.props.editing);
          }}
        />
      </div>
    ) : (
      <div className="art-board" style={style}>
        <HeaderReArrange
          onMouseDown={(event, section) => {
            this.props.selectElement(section);
          }}
        />
        <MainReArrange
          onDoubleClick={(event, element) => {
            /*this.props.updateEditing(event, element, !this.props.editing)*/
          }}
          onMouseDown={(event, element) => {
            event.stopPropagation();
            this.props.selectElement(element);
          }}
          onClick={(event, element) => {
            // debugger;
            event.stopPropagation();
            this.props.selectElement(element);
          }}
        />

        <FooterReArrange
          onMouseDown={(event, section) => {
            this.props.selectElement(section);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editing: state.editing,
  activeElement: state.activeElement,
  body: state.activeSite.body
});

export default connect(mapStateToProps, actions)(BodyLab);
