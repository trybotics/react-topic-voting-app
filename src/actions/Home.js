import {
  SET_CURRENT_USER,
  SET_USER,
  EXISTING_USER,
  LOGOUT,
  CLOSE_SNACKBAR,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  SET_NEW_TOPICS,
  SET_TOAST
} from "./ActionType";
import axios from "axios";

import config from "../config";
var apiRoot = config.api.root;

export const getCurrentUser = authToken => {
  return dispatch => {
    return axios
      .get(apiRoot + "/api/user/getAuthUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + authToken
        }
      })
      .then(response => {
        dispatch(setCurrentUser(response.data[0]));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const login = data => {
  return dispatch => {
    return axios.post(apiRoot + "/api/user/login", data).then(
      response => {
        if (response.data[0]) {
          dispatch(setCurrentUser(response.data[0]));
        } else {
          dispatch(loginFail());
        }
      },
      error => {
        dispatch(loginFail());
      }
    );
  };
};

export const signup = data => {
  return dispatch => {
    return axios.post(apiRoot + "/api/user/signup", data).then(
      response => {
        if (response.data.User) {
          dispatch(existingUser());
        } else if (response.data.id) {
          dispatch(setUser(response.data));
        } else {
          dispatch(signUpFail());
        }
      },
      error => {
        dispatch(signUpFail());
      }
    );
  };
};

export const getNewTopics = skip => {
  return dispatch => {
    return axios.get(apiRoot + "/api/topic?isHome=1&limit=20&skip=" + skip).then(
      response => {
        if (response.data.length > 0) {
          dispatch(setNewTopics(response.data));
        }
      },
      error => {
        console.log(error);
      }
    );
  };
};

export const showToast = msg => {
  return dispatch => {
    return dispatch(setToast(msg));
  };
};

export const setCurrentUser = user => {
  user.isLogin = true;
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const setUser = user => {
  user.isLogin = true;
  return {
    type: SET_USER,
    user
  };
};

export const existingUser = () => {
  return {
    type: EXISTING_USER
  };
};

export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  };
};

export const signUpFail = () => {
  return {
    type: SIGNUP_FAIL
  };
};

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR
  };
};

export const logOut = () => {
  return {
    type: LOGOUT
  };
};

export const setNewTopics = topics => {
  return {
    type: SET_NEW_TOPICS,
    topics
  };
};

export const setToast = msg => {
  return {
    type: SET_TOAST,
    msg
  };
};
