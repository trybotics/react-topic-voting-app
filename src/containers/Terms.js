import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
// import { setMetaContentByName } from '../utils/Helper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Terms extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.title = "Terms & Conditions | Topic";
  };

  render() {
    const { classes } = this.props;
    return (
      <Container disableGutters={true}	maxWidth="lg">
        <Typography
          style={{ margin: 10 }}
          align="center"
          color="inherit"
          variant="h5"
          component="h1"
        >
          Terms And Conditions
        </Typography>
        <Paper className={classes.root} elevation={1}>
          <Typography
            component="p"
            style={{ textAlign: "justify", lineHeight: 2 }}
          >
            <a href="https://www.topic.com">Topic.com</a> is a public
            website owned by "Topic". The "Terms and Conditions" under
            which you may use this website is stated here for your reference.
            If the "Terms and Conditions "are not acceptable, do not use this
            Website. By using this Website, you are indicating your acceptance
            to be bound by all the "Terms and Conditions" stated here.
            "Topic" (the "Organization") may revise these Terms and
            Conditions at any time by updating this page. You should visit
            this posting periodically to review the "Terms and Conditions",
            because they are binding on you. The terms "You" and "User" are
            used interchangeably and herein refer to everyone accessing this
            website for any reason. The term "Employer" means participating
            companies to this website and hereinafter shall also be included
            in the term "User". Usage of the Website Content All the contents
            including the HTML code of the Website is the property of the
            Organization. Any unauthorized use of the Website Content is
            strictly prohibited. You are only authorized to view and access
            the content available on or from the WebSite solely for your
            personal use. Prohibited Usage of the Website The website may be
            used only for lawful purposes by fresh/ junior employment seekers
            and employers seeking fresh/ junior employees. The Organization
            specifically prohibits any other usage of the Website, and you
            agree not to use the Website, for any of the following:
              <ol>
              <li>
                Providing any false, inaccurate or incomplete information on
                yourself
                </li>
              <li>Tampering with any material posted by other users</li>
              <li>
                Sharing of your "Password" with any third party entity ( You
                shall be solely responsible for any authorized or unauthorized
                usage of the Website based on your password)
                </li>
              <li>
                Use of alternative search engine/ agent other than those
                provided by the Organization.
                </li>
              <li>
                To post material that is abusive, malicious, defamatory,
                obscene, threatening or harassing to any other user or entity
                </li>
              <li>
                To post material containing Viruses, worms, Trojans and other
                computer programmes intending to interfere with the smooth
                functioning of the Website.
                </li>
              <li>
                To distribute, publish, or offer to share on public forums
                (including on Topic forums), content from Topic'
                question papers in any form or medium.
                </li>
            </ol>
            <br />
            Creating and/or maintaining more than one active account on the
            Topic website General Information :
              <ol>
              <li>
                The Organization does not guarantee and shall not be liable
                for the accuracy or reliability of materials posted by its
                users. The usage of the said material is at your own risk.
                </li>
              <li>
                The Organization in its sole discretion, is free to take any
                action against any user information, which it believes may
                result in loss or may create liability to itself.
                </li>
              <li>
                In case of violation of any "Terms and Condition" of the
                Website, the Organization reserves the right to remove users
                and prevent their further access to the Website.
                </li>
              <li>
                The subscription to the website by the Employer is neither
                re-saleable nor transferable to anybody else.
                </li>
              <li>
                The Employer is prohibited from forwarding/ circulating a user
                information hosted on the Website. It is solely for the usage
                of that particular Employer.
                </li>
              <li>
                The Organisation is free to offer its services to any
                client/prospective client without restriction.
                </li>
              <li>
                The Organisation reserves the right to re-schedule the test
                and/or the test centre at its sole discretion, without
                assigning any reasons thereof.
                </li>
              <li>
                Shortlisting at any stage by Topic or its clients is not
                by any means an assurance / commitment for job offer for any
                Organization.
                </li>
              <li>
                The candidates will be responsible for all the expenses
                incurred towards appearing for the test. The Organisation will
                not be reimbursing, under any circumstances, any costs
                incurred by the candidates.
                </li>
              <li>
                Some Employers require that the Organization not allow their
                employees (placed through The Organization) to apply to any
                other Employers for a period of time. The candidate
                acknowledges that, if s/he is placed with such an Employer,
                s/he will be unable to apply to other Employers during the
                period of her/his employment with the current Employer.
                </li>
              <li>
                The organization may use third-party advertising companies to
                serve ads when you visit the website. These companies may use
                information (not including your name, address, email address,
                or telephone number) about your visits to this and other
                websites in order to provide advertisements about goods and
                services of interest to you.
                </li>
            </ol>
            <br />
            Test Fee is non-refundable. Liability of the Organisation: Any
            decision regarding job posting/ hiring on or through the website
            shall be the sole discretion of the Employer. The Organization
            shall not be liable for the same. Candidates are advised to verify
            the credentials of the company before they take up employment with
            them or enter into any agreement/contract with them. Topic
            will not be responsible for any fraudulent behaviour of the
            companies or liable for any loss or damage caused to you due to
            this. The Organization does not guarantee and hence shall not be
            liable for the following:
              <ol>
              <li>
                That the contents of the Website are accurate and without any
                errors.
                </li>
              <li>
                That there would be a satisfactory response or any response at
                all for applications received using our service.
                </li>
              <li>
                That its server is free from Viruses, worms, Trojans, spyware,
                adware and harmful computer programmes.
                </li>
              <li>
                That the server will be accessible on a continuous basis.
                </li>
              <li>
                The accuracy / performance of the link provided to the
                third-party website. (The Links to the third-party website
                have been provided only for your convenience) Indemnity The
                User agrees to indemnify and defend the Organization from and
                against any claims, actions or demands resulting from usage or
                  breach of "Terms and Conditions" of the Website.{" "}
              </li>
            </ol>
            <br />
            Jurisdiction The Courts within Bangalore, India, shall have
            exclusive Jurisdiction for any claims arising under this
            agreement. Invalidity of any provision of the "Terms and
            Conditions" by any court having competent jurisdiction, shall not
            invalidate the remaining provisions of these "Terms and
            Conditions" which shall remain in full force and effect. Waiver
            Waiver of any term of the "Terms and Conditions" shall not be
            deemed a further or continuing waiver of such term or any other
            term. Reach Us At: By Telephone : +91 8961677327 By email :
            admin@topic.com \ karan.shaw9888@gmail.com.
            </Typography>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Terms);
