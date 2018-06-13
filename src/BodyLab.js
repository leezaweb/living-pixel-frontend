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
      <div
        className="art-board"
        style={style}
        onMouseDown={event => {
          event.stopPropagation();
          this.props.selectElement(this.props.header);
        }}
      >
        <HeaderEdit
          header={this.props.header}
          onMouseDown={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.header);
          }}
          onDoubleClick={(event, element) =>
            this.props.updateEditing(event, element, !this.props.editing)
          }
        />
        <MainEdit
          onDoubleClick={(event, element) =>
            this.props.updateEditing(event, element, !this.props.editing)
          }
          sections={this.props.sections}
          onMouseDown={(event, element) => {
            event.stopPropagation();
            this.props.selectElement(element);
          }}
        />
        <FooterEdit
          footer={this.props.footer}
          onMouseDown={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.footer);
          }}
          onDoubleClick={(event, element) =>
            this.props.updateEditing(event, element, !this.props.editing)
          }
        />
      </div>
    ) : (
      <div
        className="art-board"
        style={style}
        onMouseDown={event => {
          event.stopPropagation();
          this.props.selectElement(this.props.body);
        }}
      >
        <HeaderReArrange
          header={this.props.header}
          onMouseDown={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.header);
          }}
        />
        <MainReArrange
          onDoubleClick={(event, element) =>
            this.props.updateEditing(event, element, !this.props.editing)
          }
          onMouseDown={(event, element) => {
            event.stopPropagation();
            this.props.selectElement(element);
          }}
          onClick={(event, element) => {
            event.stopPropagation();
            this.props.selectElement(element);
          }}
        />

        <FooterReArrange
          footer={this.props.footer}
          onMouseDown={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.footer);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  header: state.activeSite.header,
  footer: state.activeSite.footer,
  activeElement: state.activeElement,
  editing: state.editing
});

export default connect(mapStateToProps, actions)(BodyLab);

// export default connect(null, actions)(Body);
