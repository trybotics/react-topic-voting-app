import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from "./utils/serviceWorker";
import { getCurrentUser } from './actions/Home'

const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  composeWithDevTools(applyMiddleware(thunk))
);

let authToken = localStorage.getItem("authToken")
if (authToken) {
  store.dispatch(getCurrentUser(authToken))
}

delete window.__PRELOADED_STATE__;

// Use clientEnv to access environment variables from the server.

// Get the server URL from the base tag if you need it.
// const baseHref = document.getElementsByTagName("base")[0].href;

const jssStyles = document.querySelector("#jss-server-side");
if (jssStyles) {
  jssStyles.parentElement.removeChild(jssStyles);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();