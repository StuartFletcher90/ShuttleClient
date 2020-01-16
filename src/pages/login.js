import React, { Component } from "react";
import PropTypes from "prop-types";

//? Logo & Images.

import AppIcon from "../Assets/shuttleWhite.png";
import AppIcon2 from "../Assets/shuttleFavResize.png";

//? Material UI imports.
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    maxWidth: 180,
    maxHeight: 100
  }
};

handleSubmit = event => {
  console.log("hi");
};

export class login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm color="primary">
          <img src={AppIcon} alt="shuttle!" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.TextField}
              value={this.state.email}
            />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
