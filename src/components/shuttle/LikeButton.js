import React, { Component } from "react";
import MyButton from "../../utility/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeShuttle, unlikeShuttle } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedShuttle = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.shuttleId === this.props.shuttleId
      )
    )
      return true;
    else return false;
  };
  likeShuttle = () => {
    this.props.likeShuttle(this.props.shuttleId);
  };
  unlikeShuttle = () => {
    this.props.unlikeShuttle(this.props.shuttleId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedShuttle() ? (
      <MyButton tip="Undo like" onClick={this.unlikeShuttle}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeShuttle}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  shuttleId: PropTypes.string.isRequired,
  likeShuttle: PropTypes.func.isRequired,
  unlikeShuttle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeShuttle,
  unlikeShuttle
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
