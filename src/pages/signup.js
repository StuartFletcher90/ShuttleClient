import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//?img imports
import Ufo from "../Assets/ufo.png";

//? More mui imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//? Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//TODO import themes into login page
const styles = {
  form: {
    textAlign: "center",
    color: "white"
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
  imageUfo: {
    margin: "40px auto 20px auto",
    maxWidth: 180,
    maxHeight: 100,
    webkitAnimation: "Ufo 3s infinite alternate",
    animation: "Ufo 10s infinite alternate"
  },
  signupLink: {
    color: "red !important",
    borderBottom: "1px solid red"
  }
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }
  //! Replace legacy component
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
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
          <img src={Ufo} alt="Ufo" className={classes.imageUfo} />
          <Typography variant="h2" className={classes.pageTitle}>
            Create a Shuttle
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
            <TextField
              className={classes.TextField}
              variant="standard"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Launch Code:"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
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
              id="handle"
              name="handle"
              type="text"
              label="Pilot Name"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              Create Shuttle
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small className={classes.signupMessage}>
              Already have an account? Login{" "}
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
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
