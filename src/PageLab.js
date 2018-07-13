import React, { Component } from "react";
import ArtBoard from "./ArtBoard";
import Account from "./Account";
import Panel from "./Panel";
import { Route, Switch } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";
import Nav from "./Nav";

class PageLab extends Component {
  componentDidMount() {
    window.onscroll = function() {
      myFunction();
    };

    var panel = document.querySelector(".panel");

    var sticky = panel.offsetTop - 250;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        panel.classList.add("sticky");
      } else {
        panel.classList.remove("sticky");
      }
    }
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="page-lab">
          <Switch>
            <Route exact path={"/(page-lab|defaultsite)"}>
              <div>
                <ArtBoard />
              </div>
            </Route>
            <Route exact path={"/account"}>
              <div>
                <Account />
              </div>
            </Route>
          </Switch>
          <Panel />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(PageLab);
