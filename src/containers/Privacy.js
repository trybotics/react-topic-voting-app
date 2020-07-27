import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
//import { setMetaContentByName } from '../utils/Helper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

class Privacy extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.title = "Privacy Policy | Topic";
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
          Privacy Policy
        </Typography>
        <Paper className={classes.root} elevation={1}>
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>Last updated: 10.03.2019</strong>
          </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            Topic recognises the importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Policy describes how we treat user information we collect on <a href='https://www.topic.com'>Topic.com</a> and other offline sources. This Privacy Policy applies to current and former visitors to our website and to the registered users of the website. We will not use or share your information with anyone except as described in this Privacy Policy. This Privacy Policy does not apply to information we collect by other means (including offline) or from other sources. Capitalized terms that are not defined in this Privacy Policy have the meaning given them in our Terms of Service. By visiting and/or using our website, you agree to this Privacy Policy.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>Information we collect</strong><br />
            Topic uses information we collect to analyse how the Service is used, diagnose service or technical problems, maintain security, personalize content, remember information to help you efficiently access your account, monitor aggregate metrics such as total number of visitors, traffic, and demographic patterns, and track User Content and users as necessary to comply with the Digital Millennium Copyright Act and other applicable laws.<br />
          </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>User-Provided Information:</strong><br />
            You provide us information about yourself, such as your name, e-mail address and interests, if you register for a member account with the Service. Your name and other information you choose to add to your profile will be available for public viewing on the Service. We may use your email address to send you Service-related notices (including any notices required by law, in lieu of communication by postal mail). We may also use your contact information to send you marketing email messages. If you do not want to receive such messages, you may opt out by following the instructions in  message. If you correspond with us by email, we may retain the content of your email messages, your email address and our responses.
            If you use your Facebook, Twitter,the or other social networking site (“SNS”) account information to sign in to Topic, we will collect and store your SNS user ID. If you connect your Topic account with your SNS account (such as to enable posting from Topic), we ask for your permission to collect certain information from your SNS account (such as information from your SNS profile).
            You also provide us information in User Content you post to the Service. Your Topic and other contributions on the Service, and metadata about them (such as when you posted them), are publicly viewable on the Service, along with your name (unless the Service permits you to post anonymously). This information may be searched by search engines and be republished elsewhere on the Web in accordance with our Terms of Service.
            If you choose to use our invitation service to invite a friend to the Service, you may do so by using available social network’s share feature integrated on our site or we may ask you for that person’s email address and automatically send an email invitation.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>Information Collected Automatically</strong><br />
            When you use the Service, we use persistent and session cookies (for information on cookies, please see below) and other tracking technologies such as log files, clear GIFs, and Flash technologies to: (a) store your username and password; (b) analyze the usage of the Service; (c) customize the Service to your preferences; and (d) control the advertising displayed by the Service. We also may include clear GIFs in HTML-based emails sent to our users to determine whether the message has been opened. As we adopt additional technology, we may also gather additional information through other methods.
            We use these automated technologies to collect and analyze certain types of information, including: (a) information related to the devices or browsers you use to access or interact with the Service, such as: IP addresses, geolocation information, unique device identifiers and other information about your mobile phone or other mobile device(s), browser types, browser language, and unique numbers or codes in cookies; and (b) information related to the ways in which you interact with the Service, such as: referring and exit pages and URLs, platform type, the number of clicks, domain names, landing pages, pages viewed and the order of those pages, the amount of time spent on particular pages, the date and time you used the Service, and other similar information. We may also capture other data, such as search criteria and results.
            Topic discloses a subset of this automatically collected information publicly. Specifically, you consent to Topic disclosure of information related to the ways in which you interact with the Service, such as: landing pages, pages viewed and the order of those pages, the date and time you used the Service, and other similar information on the Service to other Topic users, along with your name and profile picture.
            Contact information: We might collect your name, email, mobile number, country and IP address.
            Information/Content you post: We collect information/Content you post in a public space on our website or on a third-party social media page/space belonging to Topic.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            Cookies A cookie is a small text file stored by a website in a user’s web browser (e.g. Internet Explorer, Safari , Firefox or Chrome) that helps us in many ways to make your visit to our website more enjoyable and meaningful to you. Among other things, cookies avoid you having to log in every time you come back to our website. They also allow us to tailor a website or advertisement to better match your interests and preferences. A session cookie is stored only in your computer’s working memory (RAM) and only lasts for your browsing session. When you close all your browser’s windows, or when you shut down your computer, the session cookie disappears forever. A persistent cookie remains on your computer after you close your browser so that it can be used by your browser on subsequent visits to the Service. Persistent cookies stay on your computer until either they expire or are overwritten with newer cookies, or you manually remove them. Most browsers can be configured not to accept cookies; however, this may prevent you from having access to some site functions or features.While specific names of the cookies and similar technologies that we use may change from time to time as we improve and update our services, they generally fall into the below categories of use:Authentication and security cookies. We use these cookies to enable you to remain logged into Topic, and verify that it is you as you use Topic. This helps keep your account safe and secure from unauthorized use, and helps combat spam and other abuse which violates our policies.Analytics and research cookies. We use these cookies to better understand how people use Topic. For example, how often particular features are used, or which content leads towards user activity. Product features and setting cookies. We use these cookies to enable the functionality of some features within the Topic product, in particular to personalize the experience towards you. We also use these cookies to store certain of your preferences and settings.Advertising cookies. We use these cookies to help deliver relevant ads to you and measure the performance of ads.Flash Cookies. We may, in certain situations, use Adobe Flash Player to deliver special content, such as video clips or animation. To improve your user experience, Local Shared Objects (commonly known as "Flash cookies") are employed to provide functions such as remembering your settings and preferences. Flash cookies are stored on your device, but they are managed through an interface different from the one provided by your web browser. This means it is not possible to manage Flash cookies at the browser level, in the same way you would manage cookies. Instead, you can access your Flash management tools from Adobe's website directly. The Adobe website provides comprehensive information on how to delete or disable Flash cookies see adobe.com/security/flashplayer for further information. Please be aware that if you disable or reject Flash cookies, you may not be able to access certain features, such as video content or services that require you to sign in.For additional information on how to block cookies, please refer to the privacy or security settings of your browser.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>Third Party Analytics and Advertising</strong><br />
            Topic may allow third parties to help us collect and analyze information about your use of the service, generate aggregate site usage statistics and provide content sharing services to support the Service. These third parties may also use cookies and similar technologies to collect similar information about your use of the Service. Topic does not control the third parties’ use of such technologies and their use is governed by those parties’ privacy policies. Topic may also allow third-party ad servers or ad networks to serve advertisements on the Service and on third-party services. These third-party ad servers or ad networks use technology to send, directly to your browser, the advertisements and links that appear on Topic. They automatically receive your IP address when this happens. They may also use other technologies (such as cookies, JavaScript, or web beacons) to measure the effectiveness of their advertisements and to personalize the advertising content. Topic does not provide any information that can identify you personally to these third-party ad servers or ad networks without your consent. However, please note that if an advertiser asks Topic to show an advertisement to a certain audience and you respond to that advertisement, the advertiser or ad server may conclude that you fit the description of the audience they are trying to reach.Topic itself does not respond to “do not track” signals, and we do not control whether third parties do. For more information about third-party ad networks that use cookies and the other technologies discussed above, and to opt-out of their tailoring of ads on third-party sites based on this information, see http://www.networkadvertising.org/managing/opt_out.asp and For Consumers | www.aboutads.info.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>How We Share Your Information</strong><br />
            Topic may share your information with third party service providers for the purpose of providing the Service to you, such as payment processors, email service providers, and providers of technical infrastructure (such as servers or databases co-located with hosting providers), engineering, or other support. As we develop our business, we may buy or sell assets or business offerings. Customer, email, and visitor information are generally among the transferred business assets in these types of transactions. We may also transfer or assign such information in the course of corporate divestitures, mergers, or dissolution. We may share or disclose your information with your consent, such as if you choose to sign on to the Service through a third-party service. We cannot control third parties’ use of your information. We may disclose your information if we are required to do so by law, or if we believe in good faith that it is reasonably necessary to (i) respond to claims asserted against us or to comply with legal process (for example, subpoenas or warrants), (ii) enforce or administer our agreements with users, such as the Terms of Service; (iii) for fraud prevention, risk assessment, investigation, customer support, product development and de-bugging purposes, or (iv) protect the rights, property or safety of Topic, its users, or members of the public. By using the Service, you consent to the transfer of your information to the India and/or to other countries for storage, processing and use by Topic in accordance with our Privacy Policy. We may aggregate and/or anonymize information collected through the Service so that the information does not identify you. We may use aggregated, anonymized, and other de-identified information for any purpose, including for research and marketing purposes, and our use and disclosure of such information is not subject to any restrictions under this Privacy Policy. We may share your information for reasons not described in this policy. We will tell you before we do this.
                </Typography><br />
          <Typography component="p" style={{ textAlign: 'justify', lineHeight: 2 }}>
            <strong>How We Protect Your Information</strong><br />
            Topic uses a variety of physical, managerial, and technical safeguards to preserve the integrity and security of your information, based on the sensitivity of the information. We cannot, however, ensure or warrant the security of any information you transmit to Topic or guarantee that your information on the Service may not be accessed, disclosed, altered, or destroyed by breach of any of our physical, technical, or managerial safeguards. Your Choices About Your Information You may, of course, decline to submit information through the Service, in which case Topic may not be able to provide certain services to you. You may update or correct your account information and email preferences at any time by logging in to your account. You may also delete your account if you chose to. Please, drop us a mail if you wish to get your account deleted. Please note, once the account is deleted, the account and/or its contents including but not limited to Topics, articles etc. cannot be restored. Links to Other Web Sites We are not responsible for the practices employed by websites linked to or from the Service, nor the information or content contained therein. Please remember that when you use a link to go from the Service to another website, our Privacy Policy is no longer in effect. Your browsing and interaction on any other website, including those that have a link on our website, is subject to that website’s own rules and policies. Updates to this policy This Privacy Policy was last updated on 01.01.2017. From time to time we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates. Jurisdiction If you choose to visit the website, your visit and any dispute over privacy is subject to this Policy and the website's terms of use. In addition to the foregoing, any disputes arising under this Policy shall be governed by the laws of India. If you have any queries about this Policy or other privacy concerns, you can email us at admin@topic.com.
                </Typography>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Privacy)