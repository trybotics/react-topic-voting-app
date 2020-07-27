import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Scrollbars } from "react-custom-scrollbars";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Login from "./Login";
import SendIcon from "@material-ui/icons/Send";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InfoIcon from "@material-ui/icons/Info";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  addTopicComment,
  editTopicComment,
  deleteTopicComment,
  addTopicLike,
  addTopicDisLike
} from "../actions/Topic";
import config from '../config.json'
var rootURL = config.rootURL

function TransitionSlide(props) {
  return <Slide direction="up" {...props} />;
}

function TransitionZoom(props) {
  return <Zoom {...props} />;
}

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 194
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#0097F4"
  },
  flexGrow: {
    flex: "1 1 auto"
  },
  whatsappShare: {
    color: "#25d366 !important"
  },
  googleShare: {
    color: "#db4437 !important"
  },
  facebookShare: {
    color: "#4267b2 !important"
  },
  linkedInShare: {
    color: "#0077b5 !important"
  },
  twitterShare: {
    color: "#1da1f2 !important"
  },
  blue: {
    color: "#2196f3 !important"
  },
  formHeader: {
    textAlign: "center",
    fontSize: "20px",
    backgroundColor: "#2196f3",
    color: "#fff",
    padding: "15px 12px",
    textTransform: "uppercase"
  },
  closeIcon: {
    cursor: "pointer",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    float: "right"
  }
});

class BottomCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      comment: null,
      commentId: null,
      showCommentEditDialog: false,
      newComment: null,
      showCommentDeleteDialog: false,
      showLogin: false,
      error: [],
      redirect: ""
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded }, () => {
      setTimeout(() => {
        this.props.gridSet();
      }, 300);
    });
  };

  handleShareMenu = event => {
    this.setState({
      anchorElShareMenu: event.currentTarget
    });
  };

  handleCardMenu = event => {
    this.setState({
      anchorElCardMenu: event.currentTarget,
      commentId: event.currentTarget.id,
      newComment: event.currentTarget.value
    });
  };

  handleRequestClose = (e, url) => {
    this.setState({
      anchorElProfileMenu: null,
      anchorElCardMenu: null,
      anchorElShareMenu: null
    });
    if (url) {
      window.open(url);
    }
  };

  handleChange = event => {
    const target = event.target;
    var partialState = {};
    partialState[target.name] = target.value;
    this.setState(partialState);
  };

  AddComment = event => {
    event.preventDefault();
    this.state.error = [];
    if (!this.state.comment) {
      this.state.error["comment"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      var data = {
        comment: this.state.comment,
        id: this.props.data.id,
        authToken: "Basic " + localStorage.getItem("authToken")
      };
      if (this.props.type == "topic") {
        this.props.addTopicComment(data).then(() => {
          this.setState({ comment: "", expanded: true }, () => {
            setTimeout(() => {
              this.props.gridSet();
            }, 300);
          });
          console.log("successfully added");
        });
      }
    }
  };

  AddLike = event => {
    event.preventDefault();
    var data = {
      id: this.props.data.id,
      authToken: "Basic " + localStorage.getItem("authToken")
    };
    if (this.props.type == "topic") {
      this.props.addTopicLike(data).then(() => {
        this.setState({ comment: "" });
        console.log("successfully added");
      });
    }
    console.log(this.props.type);
  };

  AddDisLike = event => {
    event.preventDefault();
    var data = {
      id: this.props.data.id,
      authToken: "Basic " + localStorage.getItem("authToken")
    };
    if (this.props.type == "topic") {
      this.props.addTopicDisLike(data).then(() => {
        this.setState({ comment: "" });
        console.log("successfully added");
      });
    }
    console.log(this.props.type);
  };

  openCommentEditDialog = () => {
    this.setState(
      {
        anchorElProfileMenu: null,
        anchorElCardMenu: null,
        anchorElShareMenu: null
      },
      () => {
        setTimeout(() => {
          this.setState({ showCommentEditDialog: true });
        }, 500);
      }
    );
  };

  closeDialog = () => {
    this.setState({
      showCommentEditDialog: false,
      commentId: null,
      showCommentDeleteDialog: false,
      showLogin: false
    });
  };

  handleCommentEdit = () => {
    this.state.error = [];
    if (!this.state.newComment) {
      this.state.error["newComment"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      this.closeDialog();
      var data = {
        id: this.props.data.id,
        commentId: this.state.commentId,
        comment: this.state.newComment,
        authToken: "Basic " + localStorage.getItem("authToken")
      };
      if (this.props.type == "topic") {
        this.props.editTopicComment(data).then(() => {
          this.setState({ comment: "" });
          console.log("successfully edited");
        });
      }
    }
  };

  openCommentDeleteDialog = () => {
    this.setState(
      {
        anchorElProfileMenu: null,
        anchorElCardMenu: null,
        anchorElShareMenu: null
      },
      () => {
        setTimeout(() => {
          this.setState({ showCommentDeleteDialog: true });
        }, 500);
      }
    );
  };

  handleCommentDelete = () => {
    this.closeDialog();
    var data = {
      id: this.props.data.id,
      commentId: this.state.commentId,
      authToken: "Basic " + localStorage.getItem("authToken")
    };
    if (this.props.type == "topic") {
      this.props.deleteTopicComment(data).then(() => {
        this.setState({ comment: "" }, () => {
          this.props.gridSet();
        });
        console.log("successfully deleted");
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    let path;
    if (this.props.type == "affiliate") {
      path = "buy";
    } else {
      path = this.props.type;
    }
    let shareLinkURL = rootURL;
    if (this.props.type == "affiliate") {
      shareLinkURL += "/buy/" + this.props.data.id;
    } else {
      shareLinkURL += "/" + this.props.type + "/" + this.props.data.id;
    }
    const { classes } = this.props;
    let cardMenu = (
      <Menu
        // className="menu"
        anchorEl={this.state.anchorElCardMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(this.state.anchorElCardMenu)}
        onClose={e => {
          this.handleRequestClose(e);
        }}
      >
        <MenuItem onClick={this.openCommentEditDialog}>
          <ListItemIcon>
            <EditIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={<b style={{ fontSize: "14px" }}>Edit</b>} />
        </MenuItem>
        <MenuItem onClick={this.openCommentDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={<b style={{ fontSize: "14px" }}>Delete</b>} />
        </MenuItem>
      </Menu>
    );
    let shareMenu = (
      <Menu
        // className="menu"
        anchorEl={this.state.anchorElShareMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(this.state.anchorElShareMenu)}
        onClose={e => {
          this.handleRequestClose(e);
        }}
      >
        <MenuItem
          onClick={e => {
            this.handleRequestClose(e, "https://api.whatsapp.com/send?text=" + shareLinkURL);
          }}
        >
          <ListItemIcon>
            <WhatsAppIcon
              className={classes.whatsappShare}
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <b className={classes.whatsappShare} style={{ fontSize: "14px" }}>
                WhatsApp
              </b>
            }
          />
        </MenuItem>

        <MenuItem
          onClick={e => {
            this.handleRequestClose(
              e,
              "https://www.facebook.com/sharer.php?u=" + shareLinkURL
            );
          }}
        >
          <ListItemIcon>
            <FacebookIcon
              className={classes.facebookShare}
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <b className={classes.facebookShare} style={{ fontSize: "14px" }}>
                Facebook
              </b>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={e => {
            this.handleRequestClose(
              e,
              "https://www.linkedin.com/shareArticle?mini=true&url=" +
                shareLinkURL
            );
          }}
        >
          <ListItemIcon>
            <LinkedInIcon
              className={classes.linkedInShare}
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <b className={classes.linkedInShare} style={{ fontSize: "14px" }}>
                Linkedin
              </b>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={e => {
            this.handleRequestClose(
              e,
              "https://twitter.com/share?url=" + shareLinkURL
            );
          }}
        >
          <ListItemIcon>
            <TwitterIcon
              className={classes.twitterShare}
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <b className={classes.twitterShare} style={{ fontSize: "14px" }}>
                Twitter
              </b>
            }
          />
        </MenuItem>
      </Menu>
    );
    let liked = false;
    let commented = false;
    let shared = false;
    let likeCount = 0;
    if (this.props.data.likes && this.props.data.likes.length > 0) {
      for (var i = 0; i < this.props.data.likes.length; i++) {
        if (this.props.data.likes[i].like) {
          likeCount = likeCount + 1;
        }
        if (
          this.props.data.likes[i].userId == this.props.user._id &&
          this.props.data.likes[i].like
        ) {
          liked = true;
        }
      }
    }
    let disLiked = false;
    let disLikeCount = 0;
    if (this.props.data.disLikes && this.props.data.disLikes.length > 0) {
      for (var i = 0; i < this.props.data.disLikes.length; i++) {
        if (this.props.data.disLikes[i].disLike) {
          disLikeCount = disLikeCount + 1;
        }
        if (
          this.props.data.disLikes[i].userId == this.props.user._id &&
          this.props.data.disLikes[i].disLike
        ) {
          disLiked = true;
        }
      }
    }
    let comments = [];
    if (this.props.data.comments && this.props.data.comments.length > 0) {
      for (var i = this.props.data.comments.length - 1; i >= 0; i--) {
        if (this.props.data.comments[i].userId.id == this.props.user.id) {
          commented = true;
        }
        comments.push(
          <div>
            <CardHeader
              style={{ backgroundColor: "#f5f5f5" }}
              avatar={
                <Avatar src={this.props.data.comments[i].userId.imageUrl} />
              }
              action={
                this.props.user._id ==
                  this.props.data.comments[i].userId._id && (
                  <IconButton
                    id={this.props.data.comments[i]._id}
                    value={this.props.data.comments[i].comment}
                    onClick={e => {
                      this.handleCardMenu(e);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={
                <span>
                  {this.props.data.comments[i].userId.name}
                  <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
                    {" "}
                    &nbsp;&nbsp;
                    {moment(this.props.data.comments[i].createdAt).fromNow()}
                  </span>
                </span>
              }
              subheader={
                <span style={{ color: "rgb(112, 110, 105)" }}>
                  {this.props.data.comments[i].comment}
                </span>
              }
            ></CardHeader>
            <Divider light />
          </div>
        );
      }
    } else {
      comments = (
        <div>
          <CardHeader
            style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
            subheader="Be the first one to comment"
          ></CardHeader>
          <Divider light />
        </div>
      );
    }
    return (
      <div>
        {cardMenu}
        {shareMenu}
        <Divider light />
        <Grid justify="center" container spacing={0}>
          <Grid style={{ padding: 12 }} item xs={10}>
            <Input
              onChange={this.handleChange}
              name="comment"
              value={this.state.comment}
              endAdornment={
                this.state.error["comment"] ? (
                  <InputAdornment position="end">
                    <Tooltip
                      id="tooltip-icon"
                      title={this.state.error["comment"]}
                      placement="top"
                    >
                      <InfoIcon color="error" />
                    </Tooltip>
                  </InputAdornment>
                ) : null
              }
              multiline={true}
              fullWidth
              placeholder="Write your comment..."
              disableUnderline
            />
          </Grid>
          <Grid container justify="center" alignItems="center" item xs={2}>
            <IconButton
              aria-label="Send"
              onClick={e => {
                this.props.user.isLogin
                  ? this.AddComment(e)
                  : this.setState({ showLogin: true });
              }}
            >
              <SendIcon />{" "}
            </IconButton>
          </Grid>
        </Grid>
        <Divider light />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Scrollbars autoHide autoHeight autoHeightMax={260}>
            {comments}
          </Scrollbars>
        </Collapse>
        <CardActions
          disableActionSpacing
          style={{ height: "40px", marginTop: "3px" }}
        >
          <BottomNavigationAction
            showLabel
            label={
              <span className={liked ? `${classes.blue}` : ""}>
                {likeCount ? likeCount + " Likes" : "Like"}
              </span>
            }
            icon={<ThumbUpIcon className={liked ? `${classes.blue}` : ""} />}
            onClick={e => {
              this.props.user.isLogin
                ? this.AddLike(e)
                : this.setState({ showLogin: true });
            }}
          />
          <BottomNavigationAction
            showLabel
            label={
              <span className={disLiked ? `${classes.blue}` : ""}>
                {disLikeCount ? disLikeCount + " Dislikes" : "Dislike"}
              </span>
            }
            icon={<ThumbDownIcon className={disLiked ? `${classes.blue}` : ""} />}
            onClick={e => {
              this.props.user.isLogin
                ? this.AddDisLike(e)
                : this.setState({ showLogin: true });
            }}
          />
          <BottomNavigationAction
            showLabel
            label={
              <span className={commented ? `${classes.blue}` : ""}>
                {this.props.data.comments &&
                this.props.data.comments.length != 0
                  ? this.props.data.comments.length + " Comments"
                  : "Comment"}
              </span>
            }
            icon={
              <CommentIcon className={commented ? `${classes.blue}` : ""} />
            }
            onClick={this.handleExpandClick}
          />
          <BottomNavigationAction
            showLabel
            label={
              <span className={shared ? `${classes.blue}` : ""}>
                {this.props.data.shares && this.props.data.shares.length != 0
                  ? this.state.data.shares.length + " Shares"
                  : "Share"}
              </span>
            }
            icon={<ShareIcon className={shared ? `${classes.blue}` : ""} />}
            onClick={this.handleShareMenu}
          />
        </CardActions>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={this.state.showCommentEditDialog}
          onClose={this.closeDialog}
          TransitionComponent={TransitionSlide}
        >
          <div className={classes.formHeader}>
            Edit Comment{" "}
            <ClearIcon
              className={classes.closeIcon}
              onClick={this.closeDialog}
            />
          </div>
          <DialogContent style={{ marginTop: "10px" }}>
            <TextField
              label="Write your comment..."
              name="newComment"
              error={this.state.error["newComment"]}
              helperText={this.state.error["newComment"]}
              multiline
              rowsMax="6"
              type="text"
              value={this.state.newComment}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              autoFocus
            />
          </DialogContent>
          <Divider light />
          <div style={{ padding: "10px" }}>
            <Button
              style={{ float: "right" }}
              onClick={this.handleCommentEdit}
              color="primary"
            >
              Edit
            </Button>
            <Button style={{ float: "right" }} onClick={this.closeDialog}>
              Cancel
            </Button>
          </div>
        </Dialog>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={this.state.showCommentDeleteDialog}
          onClose={this.closeDialog}
          TransitionComponent={TransitionZoom}
        >
          <DialogTitle id="alert-dialog-slide-title">
            Delete Comment
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete the comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.handleCommentDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Login closeModel={this.closeDialog} open={this.state.showLogin} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.Home.login.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTopicComment: data => {
      return dispatch(addTopicComment(data));
    },
    editTopicComment: data => {
      return dispatch(editTopicComment(data));
    },
    deleteTopicComment: data => {
      return dispatch(deleteTopicComment(data));
    },
    addTopicLike: data => {
      return dispatch(addTopicLike(data));
    },
    addTopicDisLike: data => {
      return dispatch(addTopicDisLike(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BottomCardView));
