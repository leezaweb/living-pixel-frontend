import React, { Component } from "react";
import PageCast from "./PageCast";
import PageLab from "./PageLab";
import "./App.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { connect } from "react-redux";
import * as actions from "./actions";
// import NewComponent from "./NewComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/(page-lab|account)"}>
            <PageLab />
          </Route>
          <Route exact path="/page-cast">
            <PageCast />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  sites: state.sites,
  users: state.users
});

export default connect(mapStateToProps, actions)(App);

// {/*<div><NewComponent />  </div>*/}
