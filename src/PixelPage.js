import React, { Component } from "react";
import Page from "./Page";
import BodyCast from "./BodyCast";
import * as actions from "./actions";
import { connect } from "react-redux";
import { ProgressSpinner } from "primereact/components/progressspinner/ProgressSpinner";

class PixelPage extends Component {
  componentDidMount() {
    // debugger;
    if (this.props.match.params.url) {
      this.props.fetchSite({ url: this.props.match.params.url });
    }
  }

  render() {
    return (
      <div className="page-cast published">
        <div>
          <Page>{this.props.loading ? <ProgressSpinner /> : <BodyCast />}</Page>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps, actions)(PixelPage);
