import React from "react";
import { connect } from "react-redux";

class NewComponent extends React.Component {
  render() {
    return (
      <form>
        <input
          value={this.props.thing}
          onChange={event => this.props.thingDis(event.target.value)}
          type="text"
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({ thing: state.thing });

const mapDispatchToProps = dispatch => ({
  thingDis: value => dispatch({ type: "UPDATE_THING", value: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComponent);
