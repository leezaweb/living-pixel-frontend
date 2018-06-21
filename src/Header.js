import React, { Component } from "react";

class Header extends Component {
  render() {
    let { header_style } = this.props.header;
    let style = {};
    let elementStyleSansBorders = {};
    for (const [key, value] of Object.entries(header_style)) {
      let camelKey = key
        .split("_")
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join("");

      if (camelKey.includes("Width")) {
        style[camelKey] = value / 12 + "vw";
      } else {
        style[camelKey] = value;
      }
      if (!camelKey.includes("border")) {
        elementStyleSansBorders[camelKey] = value;
      }
    }
    return (
      <header style={style}>
        <h1 style={elementStyleSansBorders}>
          {JSON.parse(this.props.header.inner_text).blocks[0].text}

          {/*  <span
            dangerouslySetInnerHTML={{
              __html: draftToHtml(JSON.parse(this.props.header.inner_text))
            }}
          />*/}
        </h1>
      </header>
    );
  }
}

export default Header;
