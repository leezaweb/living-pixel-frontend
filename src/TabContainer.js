import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/components/tabview/TabView";
import Atom from "./Atom";
import Molecule from "./Molecule";
import Organism from "./Organism";
import Style from "./Style";
import * as actions from "./actions";
import { connect } from "react-redux";

class TabContainer extends Component {
  render() {
    const count = new Array(6);
    let atoms = [];
    let molecules = [];
    let organisms = [];

    for (const i of count.entries()) {
      atoms.push(<Atom key={i} />);
      molecules.push(<Molecule key={i} />);
      organisms.push(<Organism key={i} />);
    }

    let key;
    if (this.props.activeElement) {
      key = Object.keys(this.props.activeElement).find(key =>
        key.includes("_style")
      );
    }

    let propertyPanel = () => (
      <TabView>
        <TabPanel
          header={
            this.props.activeElement.tag
              ? `Selected Element Style : ${this.props.activeElement.tag} tag`
              : `Selected Element Style : ${key.replace("_style", "")} tag`
          }
          leftIcon="fa-gear"
          style={{ width: "100%" }}
        >
          <Style activeElement={this.props.activeElement} />
        </TabPanel>
      </TabView>
    );

    return (
      <TabView onTabChange={() => this.props.selectElement(null)}>
        <TabPanel header="Organisms" leftIcon="fa-gear">
          {!this.props.activeElement ? (
            <div className="atoms tile"> {organisms}</div>
          ) : (
            propertyPanel()
          )}
        </TabPanel>
        <TabPanel header="Molecules" leftIcon="fa-gear">
          {!this.props.activeElement ? (
            <div className="molecules tile"> {molecules}</div>
          ) : (
            propertyPanel()
          )}
        </TabPanel>

        <TabPanel header="Atoms" leftIcon="fa-gear">
          {!this.props.activeElement ? (
            <div className="atoms tile"> {atoms}</div>
          ) : (
            propertyPanel()
          )}
        </TabPanel>
      </TabView>
    );
  }
}

const mapStateToProps = state => ({
  activeElement: state.activeElement
});

export default connect(mapStateToProps, actions)(TabContainer);
