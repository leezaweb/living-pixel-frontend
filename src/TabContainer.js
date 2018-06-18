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
    let atoms = [
      <Atom key={6} title={"Paragraph"} id={"A6"} />,
      <Atom key={5} title={"Code"} id={"A5"} />,
      <Atom key={4} title={"H4 Header"} id={"A4"} />,
      <Atom key={3} title={"H3 Header"} id={"A3"} />,
      <Atom key={2} title={"H2 Header"} id={"A2"} />,
      <Atom key={1} title={"Image"} id={"A1"} />
    ];
    let organisms = [
      <Organism key={6} title={"template"} id={"O6"} />,
      <Organism key={5} title={"template"} id={"O5"} />,
      <Organism key={4} title={"template"} id={"O4"} />,
      <Organism key={3} title={"template"} id={"O3"} />,
      <Organism key={2} title={"template"} id={"O2"} />,
      <Organism key={1} title={"template"} id={"O1"} />
    ];
    let molecules = [
      <Molecule
        key={7}
        title={"H3 + Bottom Caption Square Gallery"}
        id={"M7"}
      />,
      <Molecule key={6} title={"H3 + Side Caption Round Gallery"} id={"M6"} />,
      <Molecule key={5} title={"H2 + Background-Image Hero"} id={"M5"} />,
      <Molecule key={4} title={"H2 + Hero Image + Texture"} id={"M4"} />,
      <Molecule key={3} title={"H3 + Code with Black Background"} id={"M3"} />,
      <Molecule
        key={2}
        title={"H2 + H4 + 3 column paragraph with Italic intro colum span"}
        id={"M2"}
      />,
      <Molecule key={1} title={"Blank Section"} id={"M1"} />
    ];

    // const count = new Array(6);
    // for (const i of count.entries()) {
    //   atoms.push(<Atom key={i} />);
    //   molecules.push(<Molecule key={i} />);
    //   organisms.push(<Organism key={i} />);
    // }

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
            <div className="organisms tile"> {organisms}</div>
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
