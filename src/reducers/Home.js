import { combineReducers } from "redux";
import {
  SET_CURRENT_USER,
  SET_USER,
  LOGOUT,
  AUTHORIZATION_FAIL,
  CLOSE_SNACKBAR,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  EXISTING_USER,
  SET_NEW_TOPICS,
  SET_TOAST
} from "../actions/ActionType";

import profile_pic from "../images/profile_pic.jpg";

const initialState = {
  userDetails: {
    _id: null,
    imageUrl: profile_pic,
    name: "Your Name",
    email: "you@domain.com",
    authToken: null,
    isLogin: false
  },
  snackbar: {
    msg: null,
    show: false
  },
  newUsers: []
};

function login(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        userDetails: action.user,
        snackbar: { msg: "Welcome Back " + action.user.name, show: true }
      });

    case SET_USER:
      return Object.assign({}, state, {
        userDetails: action.user,
        snackbar: { msg: "Welcome " + action.user.name, show: true }
      });

    case LOGOUT:
      return Object.assign({}, state, {
        userDetails: initialState.userDetails,
        snackbar: { msg: "Successfully Logout", show: true }
      });

    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: { msg: state.snackbar.msg, show: false }
      });

    case LOGIN_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Incorrect Email & Password", show: true }
      });

    case SIGNUP_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Enter Correct Data", show: true }
      });

    case EXISTING_USER:
      return Object.assign({}, state, {
        snackbar: {
          msg: "You are already registered, Please Login",
          show: true
        }
      });

    case AUTHORIZATION_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Un-Authorised, Please Login", show: true }
      });

    case SET_NEW_TOPICS:
      return Object.assign({}, state, { newTopics: action.topics })

    case SET_TOAST:
      return Object.assign({}, state, {
        snackbar: { msg: action.msg, show: true }
      });

    default:
      return state;
  }
}

const Home = combineReducers({
  login
});

export default Home;
