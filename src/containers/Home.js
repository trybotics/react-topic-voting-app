import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress'
import { getNewTopics } from '../actions/Home'
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Slider from "react-slick";
import TopicCardView from "../components/BlogCardView";


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ textAlign: 'justify', fontSize: '14px', padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const styles = theme => ({
  buttonBase: {
    backgroundColor: '#FFF',
    color: '#555',
    boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;',
    '&:hover': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      backgroundColor: '#FFF',
      color: '#009688'
    }
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
  pageSlideAnimation: {
    visibility: "hidden",
    visibility: "visible9" /*For old IE browsers IE6-8 */,
    "&::after": {
      content: "",
      display: "table",
      clear: "both"
    }
  },
  pageSlide: {
    visibility: "visible",
    animation: "pageSlide 1s"
  },
  "@keyframes pageSlide": {
    "0%": {
      opacity: "0",
      transform: "translateY(150px)"
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0px)"
    }
  },
  formHeader: {
    textAlign: "center",
    fontSize: "20px",
    backgroundColor: "#009688",
    color: "#fff",
    padding: "15px 12px",
    textTransform: "uppercase"
  },
  nounderline: {
    "& a": {
      textDecoration: 'none'
    }
  },
  follow: {
    position: 'relative',
    minHeight: '1px',
    paddingLeft: '10px',
    paddingRight: '10px',
    float: 'left',
  },
  search: {
    [theme.breakpoints.down('xs')]: {
      top: '5%',
      padding: '5%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    }
  }
})

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      category: 'Category',
      search: ''
    }
  }

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.title = "Home | Topic";
    this.props.getNewTopics(0)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  showLoginModel = () => {
    this.setState({ showLoginModel: true })
  }

  showContactUsModel = () => {
    this.setState({ showContactUsModel: true })
  }

  closeModel = () => {
    this.setState({ showLoginModel: false, showContactUsModel: false, showProfile: false })
  }

  gridSet = () => {
    // if (this.grid) {
    //   this.grid.updateLayout();
    // }
  };

  render() {
    const { classes } = this.props;
    let topicCard = []
    for (let i in this.props.newTopics) {
      topicCard.push(
        <Link style={{ all: 'initial' }} to={'topic/' + this.props.newTopics[i].id}>
          {/* <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20 }}>
              {this.props.newTopics[i].imageUrl &&
                <img width="100%" height="160px" src={this.props.newTopics[i].imageUrl} alt={this.props.newTopics[i].title} />
              }
              <Divider />
              <Typography style={{ padding: "10px", fontSize: '15px', fontWeight: 'bold' }} align="center" variant="h6" noWrap>
                {this.props.newTopics[i].title}
              </Typography>
            </Card> */}
          <div style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20 }}>
            <TopicCardView
              location={this.props.location}
              gridSet={this.gridSet}
              data={this.props.newTopics[i]}
              type="topic"
              noBottom={true}
            />
          </div>
        </Link>
      )
    }

    return (
      <Container disableGutters={true} maxWidth="lg" className={clsx(classes.pageSlideAnimation, classes.pageSlide)}>
        <Typography align="center" color='inherit' variant="h5">
          TOP VOTED TOPICS
        </Typography>
        <Grid style={{ margin: 'auto', marginTop: '20px' }} className={clsx(classes.pageSlideAnimation, classes.pageSlide)} justify='center' container spacing={0}>
          <Grid justify='center' alignItems='center' item xs={12} sm={12}>
            <div className={classes.nounderline}>
              {
                (topicCard.length > 0) ?
                  <Slider
                    dots={false}
                    arrows={false}
                    autoplay={true}
                    lazyLoad={true}
                    infinite={true}
                    speed={1500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    initialSlide={0}
                    responsive={[
                      {
                        breakpoint: 770,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1
                        }
                      },
                      {
                        breakpoint: 430,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1
                        }
                      }
                    ]}

                  >{topicCard}
                  </Slider>
                  : <center><CircularProgress size={50} /></center>
              }
            </div>
          </Grid>
          <center style={{ marginTop: '20px', marginBottom: '10px' }}>
            <Link style={{ all: 'initial' }} to="/topic">
              <Button variant="contained" size="large" color="primary">
                View More
              </Button>
            </Link>
          </center>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newTopics: state.Home.login.newTopics,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNewTopics: (skip) => {
      return dispatch(getNewTopics(skip))
    },
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))