import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class FAQ extends React.Component {
  constructor(props) {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    // document.title = "FAQ | Topic";
    // setMetaContentByName("description", "content", "Frequently asked questions (FAQ)")
    super(props);
    this.state = {
      value: 0,
      expanded: null
    };
  }

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.title = "FAQ | Topic";
  };

  handleChangeExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { expanded } = this.state;
    return (
      <Container disableGutters={true}	maxWidth="lg">
        <Typography
          style={{ margin: 10 }}
          align="center"
          color="inherit"
          variant="h5"
          component="h1"
        >
          Frequently Asked Questions
        </Typography>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChangeExpand("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="subheading">
              Question 1 (What is Topic?)
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="t-j">
              Topic is a platform for voting. The Topic community is one of the most welcoming and
              supportive communities out there.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChangeExpand("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="subheading">
              Question 2 (Why to use Topic?)
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="t-j">
              We all have secret skills. Whether it's a special and innovative
              work or ideas that are worth sharing. What's your secret?
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleChangeExpand("panel3")}
        >
          <ExpansionPanelSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="subheading">
              Question 3 (What are the benefits of Topic?)
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="t-j">
              The Topic community is one of the most welcoming and
              supportive communities out there.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={this.handleChangeExpand("panel4")}
        >
          <ExpansionPanelSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="subheading">
              Question 4 (What is our reach?)
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Topic has a huge reach. Our top authors have been featured
              across major online and traditional media channels. Businesses
              have been born, and true callings found. Who knows what might
              happen when you put your creative ideas out there?
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FAQ);
