import React, { Component } from "react";
import axios from "axios";

//? Custom JSX

import Shuttle from "../components/Shuttle";
//? MUI imports!
import Grid from "@material-ui/core/Grid";

export class home extends Component {
  state = {
    shuttle: null
  };
  componentDidMount() {
    //! Get data ftom server and setState with shuttle posts from Cloud
    axios
      .get("/shuttle")
      .then(res => {
        console.log(res.data);
        this.setState({
          shuttle: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentShuttleMarkup = this.state.shuttle ? (
      this.state.shuttle.map(shuttle => (
        <Shuttle key={shuttle.shuttleId} shuttle={shuttle} />
      ))
    ) : (
      <p>Preparing Shuttle Bays...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={6} xs={12}>
          {recentShuttleMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile here</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
