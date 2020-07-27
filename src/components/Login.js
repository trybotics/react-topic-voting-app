import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Signup from "./Signup";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { login, signup, showToast } from "../actions/Home";
import { getCanvasImageURL } from "../utils/Helper";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => ({
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
  },
  clickHere: {
    cursor: "pointer",
    textDecorationLine: "underline",
    color: "#039be5",
    // textDecoration: "none",
    webkitTapHighlightColor: "transparent"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: false,
      username: null,
      loginPassword: null,
      name: null,
      email: null,
      password: null,
      showSignup: false,
      error: [],
      showNativeLogin: false
    };
  }

  componentDidMount = () => {
    this.setState({ showNativeLogin: window.plugins ? true : false })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleLogin = () => {
    this.state.error = [];
    if (!this.state.username) {
      this.state.error["username"] = "Required";
    }
    if (!this.state.loginPassword) {
      this.state.error["loginPassword"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      this.Login();
    }
  };

  Login = () => {
    var data = {
      email: this.state.username,
      password: this.state.loginPassword
    };
    this.props.login(data).then(() => {
      if (this.props.user.id) {
        localStorage.setItem("authToken", this.props.user.authToken);
        this.props.closeModel();
      }
    });
  };

  handleSignup = () => {
    this.state.error = [];
    if (!this.state.name) {
      this.state.error["name"] = "Required";
    }
    if (!this.state.phone) {
      this.state.error["phone"] = "Required";
    }
    if (!this.state.email) {
      this.state.error["email"] = "Required";
    }
    if (!this.state.password) {
      this.state.error["password"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      this.Signup();
    }
  };

  Signup = () => {
    var data = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      imageUrl: getCanvasImageURL(this.state.name)
    };
    this.props.signup(data).then(() => {
      if (this.props.user.id) {
        localStorage.setItem("authToken", this.props.user.authToken);
        this.props.closeModel();
      }
    });
  };

  showSignup = () => {
    this.setState({ showSignup: true });
  };

  closeSignup = () => {
    this.setState({ showSignup: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          scroll="body"
          maxWidth="xs"
          open={this.props.open}
          onClose={this.props.closeModel}
          TransitionComponent={Transition}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <div className={classes.formHeader}>
            {this.state.showSignup ? "Sign Up" : "Log In"}{" "}
            {this.props.closeModel &&
              (1440 <= 380 && false ? (
                <KeyboardBackspaceIcon
                  className={classes.closeIcon}
                  style={{ float: "left" }}
                  onClick={this.props.closeModel}
                />
              ) : (
                  <CloseIcon
                    className={classes.closeIcon}
                    style={{ float: "right" }}
                    onClick={this.props.closeModel}
                    style={{ width: "25px", height: "25px" }}
                  />
                ))}
          </div>
          <DialogContent style={{ marginBottom: "15px" }}>
            {this.state.showSignup && (
              <Signup
                name={this.state.name}
                phone={this.state.phone}
                email={this.state.email}
                password={this.state.password}
                // className={this.state.showSignup ? null : "hidden"}
                error={this.state.error}
                handleChange={this.handleChange}
                closeSignup={this.closeSignup}
              />
            )}
            {!this.state.showSignup && (
              <div>
                <TextField
                  label="Email Id"
                  error={this.state.error["username"]}
                  helperText={this.state.error["username"]}
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange("username")}
                  type="email"
                  autoComplete="current-email"
                  margin="normal"
                  autoFocus={this.props.closeModel}
                  fullWidth
                />
                <TextField
                  label="Your password"
                  error={this.state.error["loginPassword"]}
                  helperText={this.state.error["loginPassword"]}
                  name="loginPassword"
                  value={this.state.loginPassword}
                  onChange={this.handleChange("loginPassword")}
                  autoComplete="current-password"
                  type="password"
                  margin="normal"
                  fullWidth
                />
              </div>
            )}
            <div>
              <Button
                style={{ marginTop: "25px" }}
                fullWidth
                variant="contained"
                color="primary"
                onClick={
                  this.state.showSignup ? this.handleSignup : this.handleLogin
                }
              >
                {this.state.showSignup ? "Sign Up" : "Log In"}
              </Button>

              <p style={{ marginTop: "30px" }}>
                <a className={classes.clickHere}>Forget Password?</a>
                <a
                  className={classes.clickHere}
                  style={{ float: "right" }}
                  onClick={
                    this.state.showSignup ? this.closeSignup : this.showSignup
                  }
                >
                  {this.state.showSignup ? "Log In" : "Sign Up"}
                </a>
              </p>
            </div>
          </DialogContent>
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
    login: data => {
      return dispatch(login(data));
    },
    signup: data => {
      return dispatch(signup(data));
    },
    showToast: data => {
      return dispatch(showToast(data));
    }
  };
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(Login)));
