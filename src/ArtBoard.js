import React, { Component } from "react";
import BodyLab from "./BodyLab";
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
            <div className="status">
              {this.props.editing ? (
                <span>
                  Editing "{this.props.activeSite.title}"
                  {" • "}
                  <button
                    onClick={event =>
                      this.props.updateEditing(event, null, !this.props.editing)
                    }
                  >
                    Re-arrange
                  </button>
                  {" • "}
                </span>
              ) : (
                <span>
                  Re-arranging "{this.props.activeSite.title}"
                  {" • "}
                  <button
                    onClick={event =>
                      this.props.updateEditing(event, null, !this.props.editing)
                    }
                  >
                    Edit
                  </button>
                  {" • "}
                </span>
              )}
              <Link to={"/page-cast"}>Preview</Link>
            </div>
            <BodyLab />
          </Page>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  activeSite: state.activeSite,
  editing: state.editing,
  loading: state.loading
});

export default connect(mapStateToProps, actions)(ArtBoard);
