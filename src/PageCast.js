import React, { Component } from "react";
import Page from "./Page";
import Body from "./Body";

class PageCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: null,
      url: "",
      title: "",
      team: [],
      sections: [],
      body: { body_property: {} },
      header: { inner_text: "", header_property: {} },
      footer: { inner_text: "", footer_property: {} }
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/sites")
      .then(resp => resp.json())
      .then(json => {
        // debugger;
        this.setState({
          version: json[0].version,
          url: json[0].url,
          title: json[0].title,
          team: json[0].teams,
          sections: json[0].sections,
          body: json[0].body,
          header: json[0].header,
          footer: json[0].footer
        });
      });
  }
  render() {
    return (
      <div className="page-cast">
        <div>
          <Page>
            <Body
              body={this.state.body}
              header={this.state.header}
              footer={this.state.footer}
              sections={this.state.sections}
            />
          </Page>
        </div>
      </div>
    );
  }
}

export default PageCast;
