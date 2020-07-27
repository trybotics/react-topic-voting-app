import React from "react";
import Hammer from 'react-hammerjs';
import { Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Home from "./containers/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQ from "./containers/FAQ";
import Terms from "./containers/Terms";
import Privacy from "./containers/Privacy";
import Topic from "./containers/Topic";
import theme from "./Theme";
import Login from "./components/Login";

export default () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
          <Hammer direction={'DIRECTION_DOWN'} onSwipe={(result) => { window.location.reload(); console.log('result', result); }}>
            <div>
              <Route style={{ clear: "both" }} exact path="*" component={Header} />
            </div>
          </Hammer>
          <div style={{ margin: 5, marginTop: 80, clear: "both", minHeight: '80vh' }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/topic" component={Topic} />
            <Route exact path="/topic/:id" component={Topic} />
          </div>
          <Route exact path="*" component={Footer} />
        </div>
      </ThemeProvider>
    </div>
  );
};
