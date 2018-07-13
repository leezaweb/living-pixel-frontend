import React, { Component } from "react";
import PageCast from "./PageCast";
import PageLab from "./PageLab";
import PixelPage from "./PixelPage";
import "./App.css";
import "./Molecules.css";
import "./Organisms.css";
import "./Atoms.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/omega/theme.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { connect } from "react-redux";
import * as actions from "./actions";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/(page-lab|account| )"}>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppear={true}
              transitionAppearTimeout={1000}
            >
              <PageLab />
            </ReactCSSTransitionGroup>
          </Route>
          <Route exact path="/sites/:url" component={PixelPage} />

          <Route exact path="/page-cast">
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppear={true}
              transitionAppearTimeout={1000}
            >
              <PageCast />
            </ReactCSSTransitionGroup>
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
