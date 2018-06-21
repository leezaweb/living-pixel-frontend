import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    let active = { borderBottom: "6px solid white " };
    return (
      <React.Fragment>
        {" "}
        <div className="navLink">
          <div> </div>
          <NavLink to="/page-lab" exact activeStyle={active}>
            <i className="fa fa-flask nav" /> page lab
          </NavLink>
          <NavLink to="/page-cast" exact activeStyle={active}>
            <i className="fa fa-eye nav" /> page cast
          </NavLink>{" "}
          <NavLink to="/account" exact activeStyle={active}>
            <i className="fa fa-user-circle nav" /> account
          </NavLink>
        </div>
        {/*  <div>
          <Menu pointing secondary>
            <Menu.Item> Living Pixel </Menu.Item>
            <Menu.Item
              name="Pixel Lab"
              active={activeItem === "Pixel Lab"}
              onClick={this.handleItemClick}
            >
              <i className="fa fab fa-react"  />
              Pixel Lab
            </Menu.Item>
            <Menu.Item
              name="Pixel Cast"
              active={activeItem === "Pixel Cast"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              <Menu.Item name="Account" active={activeItem === "account"} />
            </Menu.Menu>
          </Menu>
        </div>*/}
      </React.Fragment>
    );
  }
}

export default Nav;
