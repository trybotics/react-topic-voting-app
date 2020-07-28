import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import config from "../config";
var apiRoot = config.api.root;

function Transition(props) {
  return <Slide direction="up" {...props} />;
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
  }
});

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      text: null,
      email: null,
      phone: null,
      showSnackbar: false,
      msgSnackbar: null,
      error: []
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSend = () => {
    this.state.error = [];
    if (!this.state.name) {
      this.state.error["name"] = "Required";
    }
    if (!this.state.email) {
      this.state.error["email"] = "Required";
    }
    if (!this.state.phone) {
      this.state.error["phone"] = "Required";
    }
    if (!this.state.text) {
      this.state.error["text"] = "Required";
    }
    this.forceUpdate();
    if (Object.keys(this.state.error).length == 0) {
      this.sendEmail();
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showSnackbar: false, msgSnackbar: null });
  };

  sendEmail = () => {
    var data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      text: this.state.text
    };
    axios({
      method: "post",
      url: apiRoot + "/contact",
      data: data
    })
      .then(response => {
        this.setState({
          name: "",
          text: "",
          email: "",
          phone: "",
          showSnackbar: true,
          msgSnackbar: "Thank You, We Will Contact You Soon."
        });
        this.props.onClose && this.props.onClose();
      })
      .catch(error => {
        this.setState({
          name: "",
          text: "",
          email: "",
          phone: "",
          showSnackbar: true,
          msgSnackbar: "Please Resend the deatils."
        });
        this.props.onClose && this.props.onClose();
      });
  };

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;
    let formHeader = (
      <div className={classes.formHeader}>
        Contact Us{" "}
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
              onClick={this.props.onClose}
            />
          ))}
      </div>
    );
    let formContent = (
      <DialogContent>
        <TextField
          id="name"
          label="Name"
          error={this.state.error["name"]}
          helperText={this.state.error["name"]}
          name="name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          type="text"
          margin="normal"
          fullWidth
          autoFocus={this.props.onClose}
        />
        <TextField
          id="phone"
          label="Phone Number"
          error={this.state.error["phone"]}
          helperText={this.state.error["phone"]}
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange("phone")}
          type="tel"
          margin="normal"
          fullWidth
        />
        <TextField
          id="email"
          label="Email Id"
          error={this.state.error["email"]}
          helperText={this.state.error["email"]}
          name="email"
          value={this.state.email}
          onChange={this.handleChange("email")}
          type="email"
          margin="normal"
          fullWidth
        />
        <TextField
          id="text"
          label="Your Message"
          error={this.state.error["text"]}
          helperText={this.state.error["text"]}
          name="text"
          value={this.state.text}
          onChange={this.handleChange("text")}
          type="text"
          margin="normal"
          fullWidth
          multiline
          rowsMax="10"
          type="text"
        />
      </DialogContent>
    );
    let formAction = (
      <DialogActions>
        <Button
          onClick={() => {
            this.setState({
              name: "",
              text: "",
              email: "",
              phone: "",
              error: [],
              showSnackbar: false,
              msgSnackbar: ""
            });
          }}
          color="primary"
        >
          Clear
        </Button>
        <Button onClick={this.handleSend} color="primary">
          Send
        </Button>
      </DialogActions>
    );

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.showSnackbar}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.msgSnackbar}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />{" "}
            </IconButton>
          ]}
        />
        {this.props.onClose ? (
          <Dialog
            scroll="body"
            maxWidth="xs"
            open={this.props.open}
            onClose={this.props.onClose}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
          >
            {formHeader}
            {formContent}
            <Divider light />
            {formAction}
          </Dialog>
        ) : (
          <div>
            {formHeader}
            {formContent}
            <Divider light />
            {formAction}
          </div>
        )}
      </div>
    );
  }
}

ContactUs.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(withMobileDialog()(ContactUs));
