import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Shuttle from "../components/shuttle/Shuttle";
import Profile from "../components/profile/Profile";
import ShuttleSkeleton from "../utility/ShuttleSkeleton";

import { connect } from "react-redux";
import { getShuttles } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadIt
});

class home extends Component {
  componentDidMount() {
    this.props.getShuttles();
  }
  render() {
    const { shuttles, loading } = this.props.data;
    let recentShuttlesMarkup = !loading ? (
      shuttles.map(shuttle => (
        <Shuttle key={shuttle.shuttleId} shuttle={shuttle} />
      ))
    ) : (
      <ShuttleSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid className="shuttleLanding" item sm={8} xs={12}>
          {recentShuttlesMarkup}
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

export default connect(mapStateToProps, { getShuttles })(
  withStyles(styles)(home)
);
