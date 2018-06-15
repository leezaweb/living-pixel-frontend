import React, { Component } from "react";
import { CirclePicker } from "react-color";
import { COLORS } from "./Colors";
import { connect } from "react-redux";

class FooterReArrange extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      displayColorPicker: false,
      pickerLeft: null,
      pickerTop: null
    };
  }
  handleChangeComplete = color => {
    console.log(color);
  };

  handleDoubleClick = event => {
    this.setState({
      pickerLeft: event.pageX - 25,
      pickerTop: event.pageY - 100,
      displayColorPicker: !this.state.displayColorPicker
    });
  };
  render() {
    const colorPicker = (
      <div
        style={{
          position: "absolute",
          left: this.state.pickerLeft,
          top: this.state.pickerTop
        }}
      >
        <CirclePicker
          colors={COLORS}
          width={150}
          circleSize={14}
          circleSpacing={7}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
    // console.log(draftToHtml(JSON.parse(this.props.footer.inner_text)));
    // console.log(JSON.parse(this.props.footer.inner_text));

    let { footer_style } = this.props.footer;
    let style = {};
    let elementStyleSansBorders = {};
    for (const [key, value] of Object.entries(footer_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");
      style[camelKey] = value;
      if (!camelKey.includes("border")) {
        elementStyleSansBorders[camelKey] = value;
      }
    }
    return (
      <footer
        style={style}
        onMouseDown={event => this.props.onMouseDown(event, this.props.footer)}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.state.displayColorPicker ? colorPicker : null}

        <h5 style={elementStyleSansBorders}>
          {JSON.parse(this.props.footer.inner_text).blocks[0].text}
          {/*<span
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(this.props.footer.inner_text))
            }}
          />*/}
        </h5>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  activeElement: state.activeElement,
  footer: state.activeSite.footer
});

export default connect(mapStateToProps, null)(FooterReArrange);
