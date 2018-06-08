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
    const atoms = Array(36).fill(<Atom />);
    const molecules = Array(36).fill(<Molecule />);
    const organisms = Array(36).fill(<Organism />);

    let k;
    if (this.props.activeElement) {
      k = Object.keys(this.props.activeElement).find(k => k.includes("_style"));
    }

    let propertyPanel = () => (
      <TabView>
        <TabPanel
          header="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Selected Element Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          leftIcon="fa-gear"
          style={{ width: "100%" }}
        >
          <Style properties={this.props.activeElement[k]} />
        </TabPanel>
      </TabView>
    );

    return (
      <TabView onTabChange={() => this.props.selectElement(null)}>
        <TabPanel header="Atoms" leftIcon="fa-gear">
          {!this.props.activeElement ? (
            <div className="atoms tile"> {atoms}</div>
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
        <TabPanel header="Organisms" leftIcon="fa-gear">
          {!this.props.activeElement ? (
            <div className="atoms tile"> {organisms}</div>
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
