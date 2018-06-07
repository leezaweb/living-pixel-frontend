import React, { Component } from "react";
import { TabView, TabPanel } from "primereact/components/tabview/TabView";
import Atom from "./Atom";
import Molecule from "./Molecule";
import Organism from "./Organism";

class TabContainer extends Component {
  render() {
    const atoms = Array(36).fill(<Atom />);
    const molecules = Array(36).fill(<Molecule />);
    const organisms = Array(36).fill(<Organism />);
    return (
      <TabView>
        <TabPanel header="Atoms" leftIcon="fa-gear">
          <div className="atoms"> {atoms}</div>
        </TabPanel>
        <TabPanel header="Molecules" leftIcon="fa-gear">
          <div className="molecules"> {molecules}</div>
        </TabPanel>
        <TabPanel header="Organisms" leftIcon="fa-gear">
          <div className="organisms">{organisms}</div>
        </TabPanel>
      </TabView>
    );
  }
}

export default TabContainer;
