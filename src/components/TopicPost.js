import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { connect } from "react-redux";
import ImageIcon from "@material-ui/icons/Image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LinkIcon from "@material-ui/icons/Link";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { withStyles } from "@material-ui/core/styles";

import { addTopic, editTopic } from "../actions/Topic";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function get_youtubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        //error
    }
}

const styles = theme => ({
  formHeader: {
    textAlign: "center",
    fontSize: "20px",
    backgroundColor: "#009688",
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
  },
  buttonOutlineSelected: {
    borderRadius: "unset !important",
    border: "1px solid  #009688 !important"
  },
  buttonOutlined: {
    borderRadius: "unset !important",
    border: "1px solid rgb(153, 153, 153) !important"
  }
});

const initialState = {
  adTitle: null,
  adDescription: null,
  adImage: null,
  adVideo: null,
  adLink: null,
  showImageField: false,
  showVideoField: false,
  showLinkField: false,
  error: []
};

class TopicPost extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.data) {
      this.state = {
        adTitle: this.props.data.title,
        adDescription: this.props.data.description,
        adImage: this.props.data.imageUrl,
        adVideo: this.props.data.videoId,
        adLink: this.props.data.siteLink,
        showImageField: this.props.data.imageUrl ? true : false,
        showVideoField: this.props.data.videoId ? true : false,
        showLinkField: this.props.data.siteLink ? true : false,
        error: []
      };
    } else {
      this.state = initialState;
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleTopicPost = () => {
    this.state.error = [];
    if (!this.state.adTitle) {
      this.state.error["adTitle"] = "Required";
    }
    if (this.state.adTitle.length>255) {
      this.state.error["adTitle"] = "More than 255 characters not allowed";
    }
    if (!this.state.adDescription) {
      this.state.error["adDescription"] = "Required";
    }
    if (this.state.showImageField && !this.state.adImage) {
      this.state.error["adImage"] = "Required";
    }
    if (this.state.showVideoField && !this.state.adVideo) {
      this.state.error["adVideo"] = "Required";
    }
    if (this.state.showLinkField && !this.state.adLink) {
      this.state.error["adLink"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      this.AddTopic();
    }
  };

  AddTopic = () => {
    var data = {
      title: this.state.adTitle,
      description: this.state.adDescription,
      imageUrl: this.state.adImage,
      videoId: this.state.adVideo && get_youtubeId(this.state.adVideo),
      siteLink: this.state.adLink
    };
    if (this.props.data) {
      var id = this.props.data.id;
      this.props.editTopic(data, id).then(() => {
        this.props.onClose();
      });
    } else {
      this.props.addTopic(data).then(() => {
        this.setState(initialState);
        this.props.onClose();
      });
    }
  };

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          scroll="body"
          maxWidth="xs"
          open={this.props.open}
          onClose={this.props.onClose}
          TransitionComponent={Transition}
          fullScreen={fullScreen}
        >
          <div className={classes.formHeader}>
            Post Your Topic
            {this.props.onClose &&
              (1440 <= 380 ? (
                <KeyboardBackspaceIcon
                  className={classes.closeIcon}
                  style={{ float: "left" }}
                  onClick={this.props.onClose}
                />
              ) : (
                <CloseIcon
                  className={classes.closeIcon}
                  style={{ float: "right" }}
                  style={{ width: "25px", height: "25px" }}
                  onClick={this.props.onClose}
                />
              ))}
          </div>
          <DialogContent>
            <TextField
              id="adTitle"
              label="Title Of Your Topic"
              error={this.state.error["adTitle"]}
              helperText={this.state.error["adTitle"]}
              name="adTitle"
              value={this.state.adTitle}
              onChange={this.handleChange("adTitle")}
              type="text"
              margin="normal"
              fullWidth
              autoFocus
              maxlength="255"
            />
            <TextField
              id="adDescription"
              label="Description Of Your Topic"
              error={this.state.error["adDescription"]}
              helperText={this.state.error["adDescription"]}
              name="adDescription"
              value={this.state.adDescription}
              onChange={this.handleChange("adDescription")}
              type="text"
              margin="normal"
              fullWidth
              multiline
              rowsMax="10"
              type="text"
              maxlength="255"
            />
            {this.state.showImageField && (
              <TextField
                id="adImage"
                label="Enter Image URL"
                error={this.state.error["adImage"]}
                helperText={this.state.error["adImage"]}
                name="adImage"
                value={this.state.adImage}
                onChange={this.handleChange("adImage")}
                type="text"
                margin="normal"
                fullWidth
              />
            )}
            {this.state.showVideoField && (
              <TextField
                id="adVideo"
                label="Enter Youtube Video URL"
                error={this.state.error["adVideo"]}
                helperText={this.state.error["adVideo"]}
                name="adVideo"
                value={this.state.adVideo}
                onChange={this.handleChange("adVideo")}
                type="text"
                margin="normal"
                fullWidth
              />
            )}
            {this.state.showLinkField && (
              <TextField
                id="adLink"
                label="Enter Website Link"
                error={this.state.error["adLink"]}
                helperText={this.state.error["adLink"]}
                name="adLink"
                value={this.state.adLink}
                onChange={this.handleChange("adLink")}
                type="text"
                margin="normal"
                fullWidth
              />
            )}
          </DialogContent>
          <Divider light style={{ marginTop: "10px" }} />
          <div style={{ paddingBottom: "40px", paddingTop: "5px" }}>
            <div style={{ paddingRight: "15px" }}>
              <Button
                style={{ float: "right", fontWeight: "600" }}
                onClick={this.handleTopicPost}
                color="primary"
              >
                Post
              </Button>
              <Button
                style={{ float: "right", fontWeight: "600" }}
                onClick={this.props.onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
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
    addTopic: data => {
      return dispatch(addTopic(data));
    },
    editTopic: (data, id) => {
      return dispatch(editTopic(data, id));
    }
  };
};

TopicPost.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(TopicPost)));
