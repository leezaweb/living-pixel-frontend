import React, { Component } from "react";
import TabContainer from "./TabContainer";

class Panel extends Component {
  render() {
    return (
      <aside className="panel">
        <TabContainer />
      </aside>
    );
  }
}

export default Panel;
