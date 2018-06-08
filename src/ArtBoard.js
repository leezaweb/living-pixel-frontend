import React, { Component } from "react";
import Body from "./Body";
import Page from "./Page";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";
import { ProgressSpinner } from "primereact/components/progressspinner/ProgressSpinner";

class ArtBoard extends Component {
  componentDidMount() {
    this.props.fetchSite();
  }

  render() {
    return (
      <main>
        <Menu />
        {this.props.loading ? (
          <ProgressSpinner />
        ) : (
          <Page>
            <div>
              Editing "{this.props.activeSite.title}" •
              <Link to={"/page-cast"}> Preview</Link>
            </div>
            <Body
              body={this.props.activeSite.body}
              header={this.props.activeSite.header}
              footer={this.props.activeSite.footer}
              sections={this.props.activeSite.sections}
            />
          </Page>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  activeSite: state.activeSite,
  loading: state.loading
});

export default connect(mapStateToProps, actions)(ArtBoard);
