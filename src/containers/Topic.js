import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import StackGrid from "react-stack-grid";
import Redirect from "react-router-dom/Redirect";
import { connect } from "react-redux";
import InfiniteScroll from "../components/InfiniteScroll";
import TopicCardView from "../components/BlogCardView";
import TopicPost from "../components/TopicPost";
import Login from "../components/Login";
import ImageIcon from "@material-ui/icons/Image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LinkIcon from "@material-ui/icons/Link";
import AccessibilityOutlinedIcon from "@material-ui/icons/AccessibilityOutlined";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { withStyles } from "@material-ui/core/styles";

import {
  getTopicData,
  getTopicDetails
} from "../actions/Topic";

var pageNo = 1;

function Transition(props) {
  return <Zoom direction="up" {...props} />;
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
  buttonOutlined: {
    borderRadius: "unset !important",
    border: "1px solid rgb(153, 153, 153) !important"
  }
});

class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: null,
      openModel: props.match.params.id ? true : false,
      showTopicPost: false,
      showLogin: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location &&
      nextProps.location.search
    ) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.props.getTopicData(1, nextProps.location.search, true);
    }
  }

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (!this.props.match.params.id) {
      document.title = "Topic | Topic Vote";
    }
    if (this.props.topics.length == 0) {
      this.props.getTopicData(1, this.props.location.search, false);
    } else if (this.props.location.search) {
      this.props.getTopicData(1, this.props.location.search, true);
    }
  };

  gridSet = () => {
    if (this.grid) {
      this.grid.updateLayout();
    }
  };

  handleLoadMore = page => {
    pageNo = pageNo + 1;
    this.props.getTopicData(pageNo, this.props.location.search, false);
  };

  closeTopicPost = () => {
    this.setState({ showTopicPost: false });
  };

  closeModel = () => {
    this.setState({ openModel: false, topic: null, showLogin: false });
  };

  getTopic = id => {
    let topic = this.props.topics.find(topic => {
      return topic.id == id;
    })
    if (topic) {
      this.setState({ topic: topic })
    } else {
      this.props.getTopicDetails(id)
    }
  };

  render() {
    const { classes } = this.props;
    if (this.props.match.params.id && !this.state.openModel) {
      return <Redirect to={"/topic"} />;
    }
    let topics = [];
    let counter = 0;
    topics.push(
      <Card
        key={"topic" + counter}
        onClick={() => {
          this.props.user.isLogin
            ? this.setState({ showTopicPost: true })
            : this.setState({ showLogin: true });
        }}
      >
        <div className={classes.formHeader}>Post Your Topic </div>
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px"
          }}
        >
          <TextField
            id="topicTitle"
            label="Title of your Topic"
            name="topicTitle"
            type="text"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            id="topicDescription"
            label="Description of your Topic"
            name="topicDescription"
            type="text"
            margin="normal"
            fullWidth
            disabled
          />
        </div>
        <Divider light />
        <div style={{ paddingBottom: "40px", paddingTop: "5px" }}>
          <div style={{ paddingRight: "15px" }}>
            <Button
              style={{ float: "right", fontWeight: "600" }}
              color="primary"
            >
              Post
            </Button>
            <Button style={{ float: "right", fontWeight: "600" }}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
    for (var i in this.props.topics) {
      counter = counter + 1;
      if (this.props.topics[i].title) {
        topics.push(
          <TopicCardView
            location={this.props.location}
            key={"topic" + counter}
            gridSet={this.gridSet}
            data={this.props.topics[i]}
            type="topic"
            link
          />
        );
      }
    }

    let topic = null;
    if (this.props.match.params.id) {
      let topicBody = null;
      topic = this.props.topics.find(
        topic => topic.id == this.props.match.params.id
      );
      if (topic) {
        topicBody = (
          <TopicCardView
            location={this.props.location}
            gridSet={this.gridSet}
            data={topic}
            type="topic"
          />
        );
      } else {
        if (this.state.topic) {
          topicBody = (
            <TopicCardView
              location={this.props.location}
              gridSet={this.gridSet}
              data={this.state.topic}
              type="topic"
            />
          );
        } else {
          this.getTopic(this.props.match.params.id);
          topicBody = (
            <center>
              <center style={{ padding: "10px" }}>
                <CircularProgress size={50} />
              </center>
            </center>
          );
        }
      }
      topic = (
        <Dialog
          scroll="body"
          maxWidth="xs"
          open={this.state.openModel}
          onClose={this.closeModel}
          TransitionComponent={Transition}
          fullScreen={1440 <= 380}
        >
          {1440 <= 380 && (
            <AppBar position="sticky">
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    this.closeModel();
                  }}
                  aria-label="Close"
                >
                  <KeyboardBackspaceIcon />{" "}
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className="flex"
                  style={{ flex: 1 }}
                >
                  <AccessibilityOutlinedIcon
                    className="LogoIcon"
                    style={{ fontSize: 30 }}
                  />
                  <span className="logoText">rybotics </span>
                </Typography>
              </Toolbar>
            </AppBar>
          )}
          {topicBody}
        </Dialog>
      );
    }
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={page => {
          this.handleLoadMore(page);
        }}
        hasMore={this.props.topicHasMore}
        loader={
          <center>
            <CircularProgress size={50} />
          </center>
        }
      >
        <TopicPost
          open={this.state.showTopicPost}
          onClose={this.closeTopicPost}
        />
        <Login closeModel={this.closeModel} open={this.state.showLogin} />
        {topic}
        <StackGrid
          className="stackGrid"
          monitorImagesLoaded={false}
          gridRef={grid => (this.grid = grid)}
          columnWidth={350}
          gutterWidth={15}
          gutterHeight={15}
          enableSSR={true}
          duration={0}
        >
          {topics}
        </StackGrid>
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.Home.login.userDetails,
    topics: state.topicState.topics,
    topicHasMore: state.topicState.topicHasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopicData: (page, search, refresh) => {
      return dispatch(getTopicData(page, search, refresh));
    },
    getTopicDetails: (id) => {
      return dispatch(getTopicDetails(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Topic));
