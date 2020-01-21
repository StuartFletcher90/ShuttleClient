import React, { Component } from "react";
import PropTypes from "prop-types";

//? Custom JSX
import Shuttle from "../components/Shuttle";
import Profile from "../components/Profile";

//? MUI imports!
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getShuttles } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getShuttles();
  }
  render() {
    const { shuttle, loading } = this.props.data;

    let recentShuttleMarkup = !loading ? (
      shuttle.map(shuttle => (
        <Shuttle key={shuttle.shuttleId} shuttle={shuttle} />
      ))
    ) : (
      <p>Preparing Shuttle Bays...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={6} xs={12} className="shuttleBay">
          {recentShuttleMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getShuttles: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getShuttles })(home);
