import React, { Component } from "react";
import Header from "./Header";
import MainEdit from "./MainEdit";
import MainReArrange from "./MainReArrange";
import Footer from "./Footer";
import * as actions from "./actions";
import { connect } from "react-redux";

class Body extends Component {
  handleDoubleClick = event => {
    debugger;
    console.log("eventing");
  };
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
    console.log(this.props.editing);

    return (
      <div className="art-board" style={style}>
        <Header
          header={this.props.header}
          onClick={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.header);
          }}
        />
        {this.props.editing ? (
          <MainEdit
            onDoubleClick={() => this.props.updateEditing(!this.props.editing)}
            sections={this.props.sections}
            onMouseDown={(event, element) => {
              event.stopPropagation();
              this.props.selectElement(element);
            }}
          />
        ) : (
          <MainReArrange
            onDoubleClick={() => this.props.updateEditing(!this.props.editing)}
            onMouseDown={(event, element) => {
              event.stopPropagation();
              this.props.selectElement(element);
            }}
            onClick={(event, element) => {
              event.stopPropagation();
              this.props.selectElement(element);
            }}
          />
        )}
        <Footer
          footer={this.props.footer}
          onClick={event => {
            event.stopPropagation();
            this.props.selectElement(this.props.footer);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editing: state.editing
});

export default connect(mapStateToProps, actions)(Body);

// export default connect(null, actions)(Body);
