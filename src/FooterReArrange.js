import React, { Component } from "react";

class FooterReArrange extends Component {
  render() {
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
      <footer style={style}>
        <h5
          style={elementStyleSansBorders}
          onMouseDown={event =>
            this.props.onMouseDown(event, this.props.footer)
          }
        >
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

export default FooterReArrange;
