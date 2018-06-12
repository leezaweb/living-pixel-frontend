import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import * as actions from "./actions";
import { connect } from "react-redux";

class MainReArrange extends Component {
  onLayoutChange = (layout, layouts) => {
    if (
      this.props.activeElement &&
      "element_style" in this.props.activeElement
    ) {
      let item = layout.find(
        item => item.i === this.props.activeElement.id.toString()
      );

      this.props.updateElement({
        key: "element_style",
        grid_column_start: item.x,
        grid_column_end: item.x + item.w,
        grid_row_start: item.y,
        grid_row_end: item.y + item.h,
        element: this.props.activeElement
      });
    }
  };

  onRemoveItem(i) {
    console.log("removing", i);
    // this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <main class="re-arranging">
        {this.props.sections
          .sort((a, b) => a.sequence - b.sequence)
          .map((section, sectionIndex) => {
            let sectionStyle = {};
            for (const [key, value] of Object.entries(section.section_style)) {
              let camelKey = key
                .split("_")
                .map(
                  (w, i) =>
                    i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
                )
                .join("");
              sectionStyle[camelKey] = value;
            }

            var layout = section.elements.map((element, elementIndex) => {
              return {
                i: element.id.toString(),
                x: element.element_style.grid_column_start,
                y: element.element_style.grid_row_start,
                w:
                  element.element_style.grid_column_end -
                  element.element_style.grid_column_start,
                h:
                  element.element_style.grid_row_end -
                  element.element_style.grid_row_start
              };
            });

            return (
              <section
                style={sectionStyle}
                onClick={event => this.props.onClick(event, section)}
                key={section.id}
              >
                <GridLayout
                  onLayoutChange={this.onLayoutChange}
                  layout={layout}
                  cols={12}
                  width={930}
                  rowHeight={300}
                >
                  {section.elements.map(element => {
                    let elementStyle = {};
                    for (const [key, value] of Object.entries(
                      element.element_style
                    )) {
                      let camelKey = key
                        .split("_")
                        .map(
                          (w, i) =>
                            i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
                        )
                        .join("");
                      elementStyle[camelKey] = value;
                    }

                    return element.tag === "img" ? (
                      <div
                        key={element.id.toString()}
                        data-grid={{
                          x: element.grid_column_start,
                          y: element.grid_row_start,
                          w:
                            element.grid_column_end - element.grid_column_start,
                          h: element.grid_row_end - element.grid_row_start
                        }}
                        style={elementStyle}
                        onDoubleClick={this.props.onDoubleClick}
                        onMouseOver={event =>
                          this.props.onMouseDown(event, element)
                        }
                      >
                        <span
                          className="remove"
                          onClick={this.onRemoveItem.bind(this, element.id)}
                        >
                          x
                        </span>
                        <img className="element" src={element.src} alt="" />
                      </div>
                    ) : (
                      <p
                        className="element"
                        data-grid={{
                          x: element.grid_column_start,
                          y: element.grid_row_start,
                          w:
                            element.grid_column_end - element.grid_column_start,
                          h: element.grid_row_end - element.grid_row_start
                        }}
                        style={elementStyle}
                        key={element.id.toString()}
                        onDoubleClick={this.props.onDoubleClick}
                        onMouseOver={event =>
                          this.props.onMouseDown(event, element)
                        }
                      >
                        <span
                          className="remove"
                          onClick={this.onRemoveItem.bind(this, element.id)}
                        >
                          x
                        </span>
                        {element.inner_text}
                      </p>
                    );
                  })}
                </GridLayout>
              </section>
            );
          })}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.activeSite.sections,
  activeElement: state.activeElement
});

export default connect(mapStateToProps, actions)(MainReArrange);

// let item = this.props.sections
// .map(section => section.elements)
// .find(item => item.i === this.props.activeElement.id);
