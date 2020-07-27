import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  footer: {
    textAlign: "center",
    width: "100%",
    height: "110px",
    color: "#a2a2a2"
  },
  fMenu: {
    display: "block",
    width: "100%",
    paddingLeft: "0",
    listStyle: "none",
    marginTop: "8px",
    "& li": {
      display: "inline-block",
      paddingLeft: "5px",
      paddingRight: "5px",
      "& a": {
        color: "#a2a2a2",
        textDecoration: "none",
        "&:hover": {
          color: "#777"
        }
      }
    }
  }
});

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: 'web'
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer} style={{ clear: "both", float: "left" }}>
        <div style={{ paddingTop: "35px", fontSize: "14px" }}>
          Copyright &copy; 2020 Topic
            <ul className={classes.fMenu}>
            <li>
              <a target="_blank">Home</a>
            </li>
            <li>
              <a href={"/ad"} target="_blank">
                Ads
                </a>
            </li>
            <li>
              <a href={"/faq"} target="_blank">
                FAQ
                </a>
            </li>
            <li>
              <a href={"/privacy"} target="_blank">
                Privacy
                </a>
            </li>
            <li>
              <a href={"/terms"} target="_blank">
                Terms
                </a>
            </li>
            <li>
              <a href={"/sitemap.xml"} target="_blank">
                Sitemap
                </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
