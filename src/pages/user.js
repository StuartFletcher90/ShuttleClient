import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Shuttle from "../components/shuttle/Shuttle";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import ShuttleSkeleton from "../utility/ShuttleSkeleton";
import ProfileSkeleton from "../utility/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    shuttleIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const shuttleId = this.props.match.params.shuttleId;

    if (shuttleId) this.setState({ shuttleIdParam: shuttleId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { shuttles, loading } = this.props.data;
    const { shuttleIdParam } = this.state;

    const shuttlesMarkup = loading ? (
      <ShuttleSkeleton />
    ) : shuttles === null ? (
      <p>No shuttles from this user</p>
    ) : !shuttleIdParam ? (
      shuttles.map(shuttle => (
        <Shuttle key={shuttle.shuttleId} shuttle={shuttle} />
      ))
    ) : (
      shuttles.map(shuttle => {
        if (shuttle.shuttleId !== shuttleIdParam)
          return <Shuttle key={shuttle.shuttleId} shuttle={shuttle} />;
        else
          return (
            <Shuttle key={shuttle.shuttleId} shuttle={shuttle} openDialog />
          );
      })
    );

    return (
      <Grid container spacing={12}>
        <Grid item sm={8} xs={12}>
          {shuttlesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
