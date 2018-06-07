import React, { Component } from "react";
import Menu from "./Menu";
import GridLayout from "react-grid-layout";

class Account extends Component {
  render() {
    return (
      <div>
        <Menu />
        Account
        <GridLayout layout={layoutOuter} rowHeight={200} cols={12} width={600}>
          <div key="r1">
            <GridLayout
              layout={layout0}
              isDraggable={true}
              rowHeight={200}
              cols={12}
              width={600}
            >
              <div key="r1c1">r1c1</div>
              <div key="r1c2">r1c2</div>
              <div key="r1c3">r1c3</div>
            </GridLayout>
          </div>
          <div key="r2">
            <GridLayout layout={layout1} rowHeight={200} cols={12} width={600}>
              <div key="r2c1">r2c1</div>
              <div key="r2c2">r2c2</div>
              <div key="r2c3">r2c3</div>
            </GridLayout>
          </div>
          <div key="r3">
            <GridLayout layout={layout2} rowHeight={200} cols={12} width={600}>
              <div key="r3c1">r3c1</div>
              <div key="r3c2">r3c2</div>
              <div key="r3c3">r3c3</div>
            </GridLayout>
          </div>
        </GridLayout>
      </div>
    );
  }
}

var layoutOuter = [
  { i: "r1", x: 0, y: 0, w: 12, h: 2 },
  { i: "r2", x: 0, y: 2, w: 12, h: 2 },
  { i: "r3", x: 0, y: 4, w: 12, h: 2 }
];

var layout0 = [
  { i: "r1c1", x: 0, y: 0, w: 4, h: 2 },
  { i: "r1c2", x: 4, y: 0, w: 4, h: 2 },
  { i: "r1c3", x: 8, y: 0, w: 4, h: 2 }
];

var layout1 = [
  { i: "r2c1", x: 0, y: 2, w: 4, h: 2 },
  { i: "r2c2", x: 4, y: 2, w: 4, h: 2 },
  { i: "r2c3", x: 8, y: 2, w: 4, h: 2 }
];

var layout2 = [
  { i: "r3c1", x: 0, y: 4, w: 1, h: 2 },
  { i: "r3c2", x: 4, y: 4, w: 1, h: 2 },
  { i: "r3c3", x: 8, y: 4, w: 1, h: 2 }
];

export default Account;
