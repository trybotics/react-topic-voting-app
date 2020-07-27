import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import withStyles from "@material-ui/core/styles/withStyles";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = theme => ({
  profileView: {
    textAlign: "center"
  },
  pvHeader: {
    position: "relative",
    height: "145px",
    width: "100%",
    backgroundImage:
      'url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GfRLKaE/videoblocks-blue-digital-technology-background-logo_bjkpphjif_thumbnail-small01.jpg")',
    backgroundRepeat: "no-repeat",
    webkitBackgroundSize: "cover",
    mozbackgroundSize: "cover",
    oBackgroundSize: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  pvMain: {
    borderRadius: "50%",
    width: "130px",
    position: "absolute",
    height: "130px",
    bottom: "-50px",
    left: "50%",
    marginLeft: "-65px",
    webkitTransition: "all",
    oTransition: "all",
    transition: "all",
    webkitTransitionDuration: "300ms",
    transitionDuration: "300ms"
  },
  pvBody: {
    marginTop: "70px",
    padding: "0 20px 20px"
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          maxWidth="xs"
          open={this.props.open}
          onClose={this.props.closeModel}
          TransitionComponent={Transition}
        >
          <Card className={classes.profileView} id="profileView">
            <div className={classes.pvHeader}>
              <img
                src={this.props.user.imageUrl}
                className={classes.pvMain}
                id="pvMain"
                alt=""
              />
            </div>
            <div
              className={classes.pvBody}
              style={{ paddingTop: "10px", marginBottom: "10px" }}
            >
              <h2
                style={{
                  marginBottom: "5px",
                  margin: 0,
                  lineHeight: "100%",
                  fontSize: "20px",
                  fontWeight: "400"
                }}
              >
                {this.props.user.name}
              </h2>
              <ul
                // className={classes.pvContact}
                style={{ marginBottom: "30px", padding: 0, listStyle: "none" }}
              >
                {this.props.user.phone && (
                  <div style={{ margin: "0 5px" }}>
                    <div style={{ float: "left" }}>
                      <PhoneIcon style={{ width: "20px", height: "20px" }} />
                    </div>
                    &nbsp; {this.props.user.phone}
                  </div>
                )}
                {this.props.user.email && (
                  <div style={{ margin: "0 5px" }}>
                    <div style={{ float: "left" }}>
                      {" "}
                      <MailOutlineIcon
                        // className="f-15 f-700"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                    &nbsp; {this.props.user.email}
                  </div>
                )}
              </ul>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.props.closeModel}
              >
                Close
              </Button>
            </div>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
