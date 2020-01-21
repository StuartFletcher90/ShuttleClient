import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../utility/MyButton";
import DeleteShuttle from "./DeleteShuttle";
import ShuttleDialog from "./ShuttleDialog";

//? Mui card imports
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//? Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeShuttle, unlikeShuttle } from "../redux/actions/dataActions";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 180
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Shuttle extends Component {
  likedShuttle = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.shuttleId === this.props.shuttle.shuttleId
      )
    )
      return true;
    else return false;
  };
  likeShuttle = () => {
    this.props.likeShuttle(this.props.shuttle.shuttleId);
  };
  unlikeShuttle = () => {
    this.props.unlikeShuttle(this.props.shuttle.shuttleId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      shuttle: {
        body,
        createAt,
        userImage,
        userHandle,
        shuttleId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedShuttle() ? (
      <MyButton tip="Undo like" onClick={this.unlikeShuttle}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeShuttle}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteShuttle shuttleId={shuttleId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="secondary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ShuttleDialog shuttleId={shuttleId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Shuttle.propTypes = {
  likeShuttle: PropTypes.func.isRequired,
  unlikeShuttle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  shuttle: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  likeShuttle,
  unlikeShuttle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Shuttle));
