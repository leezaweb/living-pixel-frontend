import React, { Component } from "react";
import ArtBoard from "./ArtBoard";
import Account from "./Account";
import Panel from "./Panel";
import { Route, Switch } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";

class PageLab extends Component {
  render() {
    return (
      <div className="page-lab">
        <Switch>
          <Route exact path={"/page-lab"}>
            <ArtBoard />
          </Route>
          <Route exact path={"/account"}>
            <Account />
          </Route>
        </Switch>
        <Panel />
      </div>
    );
  }
}

export default connect(null, actions)(PageLab);
