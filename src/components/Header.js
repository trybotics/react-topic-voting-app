import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { logOut, closeSnackbar } from "../actions/Home";
import Login from "./Login";
import ContactUs from "./ContactUs";
import Profile from "./Profile";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from "@material-ui/icons/Settings";
import RestoreIcon from "@material-ui/icons/Restore";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Scrollbars } from "react-custom-scrollbars";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Link from "react-router-dom/Link";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import Drawer from "@material-ui/core/Drawer";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Home from "@material-ui/icons/Home";
import FontDownload from "@material-ui/icons/FontDownload";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Mail from "@material-ui/icons/Mail";
import { List } from "@material-ui/core";
import YourLogo from '../images/logo.jpg';
import config from "../config";
var rootURL = config.rootURL;

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: 30,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 160,
      "&:focus": {
        width: 200
      }
    },
    grow: {
      flexGrow: 1
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  LogoIcon: {
    fontSize: "30px",
    marginLeft: "-5px",
    marginRight: "-7px"
  },
  logoText: {
    position: "absolute",
    paddingTop: "10px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
    fontWeight: "500",
    fontSize: "1.3125rem",
    lineHeight: "1.66667rem"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  list: {
    width: 280
  },
  headerMenuIcon: {
    top: "0px",
    zIndex: "1110 !important",
    position: "fixed !important",
    margin: "6px !important"
  },
  blinking: {
    color: '#009688',
    animation: `$blinkingText 1.2s infinite`
  },
  "@keyframes blinkingText": {
    "0%": { color: '#009688' },
    "49%": { color: '#009688' },
    "60%": { color: 'transparent' },
    "99%": { color: 'transparent' },
    "100%": { color: '#009688' },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1100
  }
});

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElProfileMenu: null,
      anchorElCardMenu: null,
      anchorElShareMenu: null,
      open: false,
      showContactUs: false,
      showProfile: false,
      showPost: false,
      search: "",
      openWorkshop: false,
      left: false,
      autoHeightMax: 1000,
      openWebShare: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ search: "" });
  }

  componentDidMount = () => {
    this.setState({ autoHeightMax: window.innerHeight })
    setTimeout(() => {
      if (!this.state.open && !this.props.user.isLogin) {
        this.setState({ open: true });
      }
    }, 30000)
  };

  removeElementById = element => {
    var element = document.getElementById(element);
    if (element) {
      element.parentNode.removeChild(element);
    }
  };

  handleProfileMenu = event => {
    if (this.props.user.isLogin) {
      this.setState({
        anchorElProfileMenu: event.currentTarget
      });
    } else {
      this.setState({
        open: true
      });
    }
  };
  handleCardMenu = event => {
    this.setState({
      anchorElCardMenu: event.currentTarget
    });
  };

  handleShareMenu = event => {
    this.setState({
      anchorElShareMenu: event.currentTarget
    });
  };

  handleRequestClose = (e, url) => {
    this.setState({
      anchorElProfileMenu: null,
      anchorElCardMenu: null,
      anchorElShareMenu: null,
      openWebShare: false
    });
  };

  openModel = () => {
    this.setState({ open: true });
  };

  closeModel = () => {
    this.setState({ open: false, showContactUs: false, showProfile: false });
  };

  signOut = e => {
    localStorage.clear();
    this.props.logOut();
    this.handleRequestClose(e);
  };

  closePost = () => {
    this.setState({ showPost: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEnter = event => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      if (
        this.props.location.pathname == "" ||
        this.props.location.pathname == "/" ||
        this.props.location.pathname == "/home"
      ) {
        this.props.history.push({
          pathname: "topic",
          search: "?search=" + this.state.search
        });
      } else {
        console.log('this.props.location', this.props.location)
        if (this.props.location.pathname.split("/").length > 2) {
          this.props.location.pathname = "/" + this.props.location.pathname.split("/")[1];
        } else {
          this.props.history.push({
            pathname: this.props.location.pathname.split("/")[1],
            search: "?search=" + this.state.search
          });
        }
      }
    }
  };
  handleWorkshopClick = () => {
    this.setState({ openWorkshop: !this.state.openWorkshop });
  };
  toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ [side]: open });
  };

  render() {
    let shareLinkURL = rootURL + this.props.location.pathname
    const { classes } = this.props;
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onKeyDown={this.toggleDrawer(side, false)}
      >
        {/* </Scrollbars> */}

        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={this.state.autoHeightMax}
          thumbMinSize={30}
          universal={true}
          {...this.props}
        >
          <List style={{ padding: "0px" }}>
            <ListItem
              button
              onClick={e => {
                this.props.user.isLogin
                  ? this.setState({ open: false, showProfile: true })
                  : this.setState({ open: true, showProfile: false });
              }}
              style={{
                background:
                  'url("https://ak.picdn.net/shutterstock/videos/31245328/thumb/1.jpg")',
                position: "relative",
                padding: "32px 32px 12px",
                marginBottom: "8px"
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={this.props.user.name}
                  src={this.props.user.imageUrl}
                  style={{ height: "64px", width: "64px" }}
                />

                <ListItemText
                  primary={this.props.user.name}
                  style={{ color: "white", paddingTop: "10px" }}
                />
                <ListItemText
                  primary={this.props.user.email}
                  style={{ color: "white" }}
                />
              </ListItemAvatar>
            </ListItem>
            <Link style={{ all: "initial" }} to="/home">
              <ListItem button onClick={this.toggleDrawer(side, false)}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link style={{ all: "initial" }} to="/topic">
              <ListItem button onClick={this.toggleDrawer(side, false)}>
                <ListItemIcon>
                  <FontDownload />
                </ListItemIcon>
                <ListItemText primary={<span>Post Topic</span>} />
              </ListItem>
            </Link>
            <Link style={{ all: "initial" }} to="/faq">
              <ListItem button onClick={this.toggleDrawer(side, false)}>
                <ListItemIcon>
                  <QuestionAnswer />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
              </ListItem>
            </Link>
            <Link style={{ all: "initial" }} to="/terms">
              <ListItem button onClick={this.toggleDrawer(side, false)}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Terms" />
              </ListItem>
            </Link>
            <Link style={{ all: "initial" }} to="/privacy">
              <ListItem button onClick={this.toggleDrawer(side, false)}>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy" />
              </ListItem>
            </Link>
            {/* </List> */}
            <ListItem waves divider />
            {/* <List> */}
            <ListSubheader
              style={{ fontSize: "15px" }}
              component="div"
              id="nested-list-subheader"
            >
              Get In Touch{" "}
            </ListSubheader>
            <ListItem
              button
              onClick={() => {
                this.setState({ showContactUs: true });
              }}
            >
              <ListItemIcon onClick={this.toggleDrawer(side, false)}>
                <Mail />
              </ListItemIcon>
              <ListItemText
                onClick={this.toggleDrawer(side, false)}
                primary="Contact Us"
              />
            </ListItem>
          </List>
        </Scrollbars>
      </div>
    );

    let profileMenu = (
      <Menu
        style={{ display: "block" }}
        anchorEl={this.state.anchorElProfileMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(this.state.anchorElProfileMenu)}
        onClose={this.handleRequestClose}
      >
        <MenuItem
          onClick={e => {
            this.handleRequestClose(e);
            setTimeout(() => {
              this.setState({ showProfile: true });
            });
          }}
        >
          <ListItemIcon>
            <AssignmentIndIcon />{" "}
          </ListItemIcon>
          <ListItemText
            primary={<div style={{ fontSize: "14px" }}>Profile</div>}
          />
        </MenuItem>
        <MenuItem onClick={this.handleRequestClose}>
          <ListItemIcon>
            <SettingsIcon />{" "}
          </ListItemIcon>
          <ListItemText
            primary={<div style={{ fontSize: "14px" }}>Settings</div>}
          />
        </MenuItem>
        <MenuItem
          onClick={e => {
            this.signOut(e);
          }}
        >
          <ListItemIcon>
            <RestoreIcon />{" "}
          </ListItemIcon>
          <ListItemText
            primary={<div style={{ fontSize: "14px" }}>Logout</div>}
          />
        </MenuItem>
      </Menu>
    );
    const mobileToolbar = <Toolbar
      style={{
        marginLeft: 12,
        minHeight: 60,
        paddingRight: 5,
        paddingLeft: 5
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleDrawer("left", true)}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h5"
        color="inherit"
        className="flex"
        style={{ flex: 1 }}
      >
        Topic Vote
      </Typography>

      <Hidden xsDown>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            name="search"
            placeholder="Search by Keyword…"
            value={this.state.search}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </Hidden>
      <div id="google_translate_element"></div>
      <IconButton
        style={{
          height: 60,
          width: 60,
          marginTop: this.props.user.isLogin ? -5 : 0,
          marginLeft: 5
        }}
        aria-haspopup="true"
        color="inherit"
        aria-label="Profile"
        onClick={this.handleProfileMenu}
      >
        {this.props.user.isLogin ? (
          <Avatar
            style={{
              border: "3px solid #ffffff",
              borderRadius: "50%",
              width: "35px",
              height: "35px"
            }}
            src={this.props.user.imageUrl}
          />
        ) : (
            <AccountCircleIcon style={{ fontSize: "30px" }} />
          )}
      </IconButton>
    </Toolbar>
    return (
      <div>
        {profileMenu}
        <Hidden smUp>
          <HideOnScroll {...this.props}>
            <AppBar style={{ boxShadow: '0px 0px 0px 0px' }}>
              {mobileToolbar}
            </AppBar>
          </HideOnScroll>
        </Hidden>
        <div className={classes.headerMenuIcon}>
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
            onOpen={this.toggleDrawer("left", true)}
          >
            {sideList("left")}
          </SwipeableDrawer>
        </div>
        <Hidden smUp>
          <AppBar style={{ zIndex: 1050, boxShadow: '0px 0px 0px 0px' }}>
            <Toolbar style={{ minHeight: "60px" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.toggleDrawer("left", true)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <div
                className={classes.search}
                style={{ marginLeft: "5px", marginRight: "6px" }}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  name="search"
                  placeholder="Search by Keyword…"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyDown={this.handleEnter}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </Hidden>
        <AppBar style={{ zIndex: 1000 }}>
          {mobileToolbar}
        </AppBar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.props.snackbar.show}
          autoHideDuration={3000}
          onClose={this.props.closeSnackbar}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.snackbar.msg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <ContactUs open={this.state.showContactUs} onClose={this.closeModel} />
        <Login closeModel={this.closeModel} open={this.state.open} />
        <Profile
          user={this.props.user}
          closeModel={this.closeModel}
          open={this.state.showProfile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.Home.login.userDetails,
    snackbar: state.topicState.snackbar.show ? state.topicState.snackbar : state.Home.login.snackbar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      return dispatch(logOut());
    },
    closeSnackbar: () => {
      return dispatch(closeSnackbar());
    }
  };
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
