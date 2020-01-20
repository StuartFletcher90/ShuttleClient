import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//? Logo & Images.

import AppIcon from "../Assets/rocketShip.png";

//? Material UI imports.
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//? Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

//? style theme
const styles = {
  form: {
    textAlign: "center",
    color: "white"
  },
  image: {
    margin: "8em auto 20px auto",
    maxWidth: 180,
    maxHeight: 100,
    webkitAnimation: "example 3s infinite alternate",
    animation: "example 5s infinite alternate"
  },

  pageTitle: {
    margin: "20px auto 20px auto",
    textShadow: ".5px .5px 3px rgba(255, 255, 255, 0.39)",

    color: "#673ab7 !important"
  },
  TextField: {
    margin: "10px auto 10px auto"
  },
  input: {
    color: "white",
    borderBottomColor: "white"
  },
  labelRoot: {
    color: "white",
    borderBottomColor: "white !important"
  },
  Button: {
    margin: 25,
    position: "relative",
    "&:hover": {
      boxShadow: "0px 1px 20px 10px #DDDCE0",
      color: "white"
    }
  },
  progress: {
    position: "absolute"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },

  signupLink: {
    color: "red !important",
    borderBottom: "1px solid red"
  }
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="shuttle!" className={classes.image} />
          <Typography variant="h1" className={classes.pageTitle}>
            Shuttle
          </Typography>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            className={classes.FormInputs}
          >
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email:"
              className={classes.TextField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot
                }
              }}
              fullWidth
            />
            <TextField
              className={classes.TextField}
              variant="standard"
              id="password"
              name="password"
              type="password"
              label="Launch Code:"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              InputProps={{
                className: classes.input
              }}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot
                }
              }}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.Button}
              disabled={loading}
            >
              Board Shuttle
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small className={classes.signupMessage}>
              Dont have a shuttle? Sign up{" "}
              <Link to="/signup" className={classes.signupLink}>
                Here!
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
//? full width (above) is apart of the MUI library
login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
