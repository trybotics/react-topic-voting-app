import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Forms
import TopicPost from "./TopicPost";
import BottomCardView from "./BottomCardView";

// Actions
import { deleteTopic } from "../actions/Topic";

function TransitionZoom(props) {
  return <Zoom {...props} />;
}

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 194
  },
  affiliateLogo: {
    height: 35,
    width: 100
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
  hidden: {
    display: "none"
  },
  imgResponsive: {
    display: "block",
    maxWidth: "100%",
    height: "auto"
  }
});

class BlogCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorElCardMenu: null, fullContent: false };
  }

  handleCardMenu = event => {
    this.setState({
      anchorElCardMenu: event.currentTarget,
      showBlogForm: false,
      showBlogDelete: false
    });
  };

  showFullContent = event => {
    this.setState(
      {
        fullContent: true
      },
      () => {
        this.props.gridSet();
      }
    );
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

  closeDialog = () => {
    this.setState({ showBlogForm: false, showBlogDelete: false });
  };

  openBlogEdit = () => {
    this.setState(
      {
        anchorElProfileMenu: null,
        anchorElCardMenu: null,
        anchorElShareMenu: null
      },
      () => {
        setTimeout(() => {
          this.setState({ showBlogForm: true });
        }, 500);
      }
    );
  };

  openBlogDelete = () => {
    this.setState(
      {
        anchorElProfileMenu: null,
        anchorElCardMenu: null,
        anchorElShareMenu: null
      },
      () => {
        setTimeout(() => {
          this.setState({ showBlogDelete: true });
        }, 500);
      }
    );
  };

  handleDelete = () => {
    var id = this.props.data.id;
    if (this.props.type == "topic") {
      this.props.deleteTopic(id).then(() => {
        this.closeDialog();
        this.props.gridSet();
      });
    }
  };

  render() {
    let path = "";
    if (this.props.location.pathname.split("/").length < 3) {
      path = this.props.type + "/";
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
        <MenuItem
          onClick={() => {
            this.props.type == 'project' ? this.props.history.push('/edit-project/' + this.props.data.id) : this.openBlogEdit()
          }}
        >
          <ListItemIcon>
            <EditIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={<b style={{ fontSize: "14px" }}>Edit</b>} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.openBlogDelete();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={<b style={{ fontSize: "14px" }}>Delete</b>} />
        </MenuItem>
      </Menu>
    );

    let description,
      text = null;
    if (this.props.data.description) {
      text = this.props.data.description.toString();
      if (text) {
        if (text.length < 210 || this.state.fullContent == true) {
          description = text;
        } else {
          description = (
            <span style={{ fontWeight: "550", fontSize: "12px" }}>
              {this.props.data.description.substr(0, 210)}
              <a
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                  color: "#039be5"
                }}
                onClick={e => {
                  this.showFullContent(e);
                }}
              >
                {" "}
                ... show more
              </a>
            </span>
          );
        }
      }
    }

    return (
      <div id={this.props.id} key={this.props.id}>
        {cardMenu}
        <Card>
          {!this.props.noCardHeader && this.props.data.author && (
            <div>
              <CardHeader
                avatar={<Avatar src={this.props.data.author.imageUrl} />}
                action={
                  <IconButton
                    className={
                      this.props.data.author.id == this.props.user.id
                        ? ""
                        : `${classes.hidden}`
                    }
                    onClick={this.handleCardMenu}
                  >
                    <MoreVertIcon />{" "}
                  </IconButton>
                }
                title={this.props.data.author.name}
                subheader={moment(this.props.data.createdAt).fromNow()}
              />
              <Divider light />
            </div>
          )}
          {this.props.user.isAdmin && this.props.type != "project" && this.props.type != "blog" && this.props.type != "topic" && (
            <div>
              <CardHeader
                action={
                  <IconButton onClick={this.handleCardMenu}>
                    <MoreVertIcon />{" "}
                  </IconButton>
                }
              />
              <Divider light />
            </div>
          )}
          {this.props.data.imageUrl && (
            <div>
              <center>
                {this.props.link ? (
                  <Link
                    style={{ all: "initial" }}
                    to={path + this.props.data.id}
                  >
                    <img
                      ref={input => {
                        // onLoad replacement for SSR
                        if (!input) {
                          return;
                        }
                        const img = input;
                        const updateFunc = () => {
                          this.props.gridSet();
                        };
                        img.onload = updateFunc;
                        if (img.complete) {
                          updateFunc();
                        }
                      }}
                      className={classes.imgResponsive}
                      src={this.props.data.imageUrl}
                      alt=""
                    />
                  </Link>
                ) : (
                    <img
                      ref={input => {
                        // onLoad replacement for SSR
                        if (!input) {
                          return;
                        }
                        const img = input;
                        const updateFunc = () => {
                          this.props.gridSet();
                        };
                        img.onload = updateFunc;
                        if (img.complete) {
                          updateFunc();
                        }
                      }}
                      className={classes.imgResponsive}
                      src={this.props.data.imageUrl}
                      alt=""
                    />
                  )}
              </center>
              <Divider light />
            </div>
          )}
          {this.props.data.imageUrl && this.props.data.videoId && (
            <Divider
              style={{ marginTop: "20px", marginBottom: "20px" }}
              light
            />
          )}
          {this.props.data.videoId && !this.props.data.imageUrl && (
            <div>
              <Grid
                style={{ margin: "auto" }}
                justify="center"
                container
                spacing={0}
              >
                <iframe
                  width="360"
                  height="240"
                  src={
                    "https://www.youtube.com/embed/" + this.props.data.videoId
                  }
                  frameborder="0"
                  gesture="media"
                  allow="encrypted-media"
                  allowFullScreen
                ></iframe>
              </Grid>
              <Divider light />
            </div>
          )}
          {this.props.data.videoUrl && !this.props.data.imageUrl && (
            <div>
              <Grid
                style={{ margin: "auto" }}
                justify="center"
                container
                spacing={0}
              >
                <iframe
                  width="360"
                  height="240"
                  src={this.props.data.videoUrl}
                  frameborder="0"
                  gesture="media"
                  allow="encrypted-media"
                  allowFullScreen
                ></iframe>
              </Grid>
              <Divider light />
            </div>
          )}
          <CardContent>
            <Link style={{ all: "initial" }} to={path + this.props.data.id}>
              <Typography
                style={{
                  textAlign: "justify",
                  fontWeight: "600",
                  fontSize: "18px",
                  fontFamily: '"Roboto", "Helvetica" ,"Arial" ,sans-serif'
                }}
                variant="title"
              >
                {this.props.data.title}
              </Typography>
            </Link>
            <Typography
              style={{
                textAlign: "justify",
                marginTop: "5px",
                fontWeight: "550",
                fontSize: "12px"
              }}
              variant="body2"
            >
              {description && description}
              {(this.props.type == "blog" || this.props.type == "topic") && (
                <span>
                  {this.props.data.videoId && (
                    <a
                      href={
                        "https://www.youtube.com/embed/" +
                        this.props.data.videoId
                      }
                      target="_blank"
                      style={{
                        color: "#039be5",
                        textDecoration: "none",
                        fontWeight: "600"
                      }}
                    >
                      <br />
                      For YouTube Video Click Here
                    </a>
                  )}
                  {this.props.data.siteLink && (
                    <a
                      href={this.props.data.siteLink}
                      target="_blank"
                      style={{
                        color: "#039be5",
                        textDecoration: "none",
                        fontWeight: "600"
                      }}
                    >
                      <br />
                      Visit Website Click Here
                    </a>
                  )}
                </span>
              )}
            </Typography>
          </CardContent>
          <BottomCardView
            gridSet={this.props.gridSet}
            data={this.props.data}
            type={this.props.type}
          />
        </Card>
        {(this.props.type == "topic") ?
          <TopicPost
            key={this.props.data.id}
            open={this.state.showBlogForm}
            onClose={this.closeDialog}
            data={this.props.data}
          />:''
        }
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={this.state.showBlogDelete}
          onClose={this.closeDialog}
          TransitionComponent={TransitionZoom}
        >
          <DialogTitle id="alert-dialog-slide-title">
            Delete Topic
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete you Topic?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BlogCardView.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.Home.login.userDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTopic: id => {
      return dispatch(deleteTopic(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BlogCardView));
