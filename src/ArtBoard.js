import React, { Component } from "react";
import BodyLab from "./BodyLab";
import Page from "./Page";
import { Link } from "react-router-dom";
import * as actions from "./actions";
import { connect } from "react-redux";
import { ProgressSpinner } from "primereact/components/progressspinner/ProgressSpinner";

class ArtBoard extends Component {
  componentDidMount() {
    let id = parseInt(localStorage.getItem("id"), 10) || 1;
    window.localStorage.setItem("id", JSON.stringify(id));
    this.props.fetchSite({ id: parseInt(localStorage.getItem("id"), 10) });
  }

  handleURLSubmit = event => {
    event.preventDefault();
    this.props.updateSite({
      url: event.target.url.value
    });
    event.target.reset();
  };

  handleTitleSubmit = event => {
    event.preventDefault();
    this.props.updateSite({
      title: event.target.title.value
    });
    event.target.reset();
  };

  newSite = () => {
    this.props.createSite();
  };

  render() {
    if (this.props.activeSite.id) {
      // debugger;
      let id = this.props.activeSite.id;
      localStorage.setItem("id", JSON.stringify(id));
    }

    return (
      <div>
        {/*<Menu />*/}
        {this.props.loading ? (
          <ProgressSpinner />
        ) : (
          <Page>
            <div className="status">
              <div>
                {this.props.editing ? (
                  <span>
                    Editing "{this.props.activeSite.title}"
                    {" • "}
                    <button
                      onClick={event =>
                        this.props.updateEditing(
                          event,
                          null,
                          !this.props.editing
                        )
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
                        this.props.updateEditing(
                          event,
                          null,
                          !this.props.editing
                        )
                      }
                    >
                      Edit
                    </button>
                    {" • "}
                  </span>
                )}{" "}
              </div>
              <div>
                <Link to={"/page-cast"} target="blank">
                  Preview
                </Link>
              </div>
              <div>
                <form onSubmit={this.handleTitleSubmit} action="POST">
                  <label>
                    Title:{" "}
                    <input
                      type="text"
                      name="title"
                      defaultValue={this.props.activeSite.title}
                    />
                  </label>{" "}
                  <button className="btn">Update</button>
                </form>
                {"    "}
                <form onSubmit={this.handleURLSubmit} action="POST">
                  <label>
                    URL:{" "}
                    <input
                      type="text"
                      name="url"
                      defaultValue={this.props.activeSite.url}
                    />
                  </label>{" "}
                  <button className="btn">Publish</button>
                </form>
              </div>
              <div>
                <button className="btn" onClick={this.newSite}>
                  New Site
                </button>
              </div>
            </div>
            <BodyLab />
          </Page>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSite: state.activeSite,
  editing: state.editing,
  loading: state.loading
});

export default connect(mapStateToProps, actions)(ArtBoard);
