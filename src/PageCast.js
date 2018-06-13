import React, { Component } from "react";
import Page from "./Page";
import BodyCast from "./BodyCast";
import * as actions from "./actions";
import { connect } from "react-redux";
import { ProgressSpinner } from "primereact/components/progressspinner/ProgressSpinner";

class PageCast extends Component {
  componentDidMount() {
    this.props.fetchSite();
  }
  render() {
    return (
      <div className="page-cast">
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

export default connect(mapStateToProps, actions)(PageCast);
