import React, { Component } from "react";
import * as actions from "./actions";
import { connect } from "react-redux";

class Style extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.properties;
  }

  // static getDerivedStateFromProps(props, state) {
  //   return state.properties !== props.properties
  //     ? props.properties
  //     : state.properties;
  // }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log("new props, id: ", this.props.properties.id);
    let labelsFields = Object.entries(this.props.properties).map((k, v) => {
      if (!k[0].includes("_id") && k[0] !== "id") {
        return (
          <div key={v}>
            <label>{k[0].replace(/_/g, " ")}: </label>
            {typeof k[1] === "number" ? (
              <input
                type="number"
                value={this.state[k[0]]}
                name={k[0]}
                onChange={this.handleChange}
              />
            ) : (
              <input
                type="text"
                value={this.state[k[0]]}
                name={k[0]}
                onChange={this.handleChange}
              />
            )}
          </div>
        );
      } else {
        return null;
      }
    });

    return (
      <form>
        {labelsFields}
        <button>save</button>
      </form>
    );
  }
}

export default connect(null, actions)(Style);
