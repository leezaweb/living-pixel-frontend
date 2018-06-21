import React, { Component } from "react";

class Footer extends Component {
  render() {
    let { footer_style } = this.props.footer;
    let style = {};
    let elementStyleSansBorders = {};
    for (const [key, value] of Object.entries(footer_style)) {
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
      <footer style={style}>
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

export default Footer;
