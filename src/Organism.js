import React, { Component } from "react";

class Organism extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }

  dragStart = e => {
    console.log("start");
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  };
  dragEnd = e => {
    console.log("end");
    this.dragged.style.display = "block";

    // Update state
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data: data });
  };
  dragOver = e => {
    console.log("over");
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className === "placeholder") return;
    this.over = e.target;
  };

  render() {
    return (
      <div onDragOver={this.dragOver}>
        <div
          className="box"
          data-id={"o"}
          draggable="true"
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
        >
          <i className="fa fa-object-ungroup" />Organism
        </div>
      </div>
    );
  }
}

export default Organism;
