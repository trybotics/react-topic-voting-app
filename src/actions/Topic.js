import {
    AUTHORIZATION_FAIL,
    TOPIC_ADDED,
    TOPIC_FAIL,
    TOPIC_EDITED,
    TOPIC_DELETED,
    SET_TOPIC_DATA,
    SET_TOPIC_HAS_MORE,
    TOPIC_COMMENT_ADDED,
    TOPIC_COMMENT_EDITED,
    TOPIC_COMMENT_DELETED,
    TOPIC_COMMENT_FAIL,
    TOPIC_LIKE_ADDED,
    TOPIC_LIKE_FAIL,
    TOPIC_LIKE_REMOVED,
    TOPIC_DISLIKE_ADDED,
    TOPIC_DISLIKE_REMOVED,
    SET_TOPIC_DETAILS,
    SET_FETCHING_TOPIC_DETAILS
  } from "./ActionType";
  import axios from "axios";
  
  import config from "../config";
  var apiRoot = config.api.root;
  
  export const getTopicData = (page, search, refresh) => {
    let skip = (page - 1) * 6;
    return dispatch => {
      let url = search
        ? apiRoot + "/api/topic" + search + "&limit=6&skip=" + skip
        : apiRoot + "/api/topic?limit=6&skip=" + skip;
      return axios.get(url).then(
        response => {
          if (response.data.length > 0) {
            dispatch(setTopicData(response.data, refresh));
          } else {
            dispatch(setTopicHasMore(false));
            console.log("No data");
          }
        },
        error => {
          console.log(error);
        }
      );
    };
  };
  
  export const getTopicDetails = id => {
    return dispatch => {
      dispatch(setFetchingTopicDetails(true));
      return axios.get(apiRoot + "/api/topic/" + id).then(
        response => {
          dispatch(setTopicDetails(response.data));
          dispatch(setFetchingTopicDetails(false));
        },
        error => {
          console.log(error);
          dispatch(setFetchingTopicDetails(false));
        }
      );
    };
  };
  
  export const addTopic = data => {
    return dispatch => {
      return axios
        .post(apiRoot + "/api/topic", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + localStorage.getItem("authToken")
          }
        })
        .then(
          response => {
            if (response.data) {
              dispatch(topicAdded(response.data));
            } else {
              dispatch(topicFail());
            }
          },
          error => {
            dispatch(authorizationFail());
          }
        );
    };
  };
  
  export const editTopic = (data, id) => {
    return dispatch => {
      return axios
        .put(apiRoot + "/api/topic/" + id, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + localStorage.getItem("authToken")
          }
        })
        .then(
          response => {
            if (response.data) {
              dispatch(topicEdited(response.data));
            } else {
              dispatch(topicFail());
            }
          },
          error => {
            dispatch(authorizationFail());
          }
        );
    };
  };
  
  export const deleteTopic = id => {
    return dispatch => {
      return axios
        .delete(apiRoot + "/apitopic/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + localStorage.getItem("authToken")
          }
        })
        .then(
          response => {
            if (response.status == 202) {
              dispatch(topicDeleted(id));
            } else {
              console.log("fail");
              dispatch(topicFail());
            }
          },
          error => {
            dispatch(authorizationFail());
          }
        );
    };
  };
  
  export const addTopicComment = data => {
    return dispatch => {
      return axios
        .post(
          apiRoot + "/api/topic/addComment/" + data.id,
          { comment: data.comment },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: data.authToken
            }
          }
        )
        .then(
          response => {
            if (response.data) {
              dispatch(commentAdded(response.data));
            } else {
              dispatch(commentFail());
            }
          },
          error => {
            dispatch(commentFail());
          }
        );
    };
  };
  
  export const editTopicComment = data => {
    return dispatch => {
      return axios
        .put(
          apiRoot + "/api/topic/editComment/" + data.id + "/" + data.commentId,
          { comment: data.comment },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: data.authToken
            }
          }
        )
        .then(
          response => {
            if (response.data) {
              dispatch(commentEdited(response.data));
            } else {
              dispatch(commentFail());
            }
          },
          error => {
            dispatch(commentFail());
          }
        );
    };
  };
  
  export const deleteTopicComment = data => {
    return dispatch => {
      return axios
        .delete(
          apiRoot + "/api/topic/deleteComment/" + data.id + "/" + data.commentId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: data.authToken
            }
          }
        )
        .then(
          response => {
            if (response.data) {
              dispatch(commentDeleted(response.data));
            } else {
              dispatch(commentFail());
            }
          },
          error => {
            dispatch(commentFail());
          }
        );
    };
  };
  
  export const addTopicLike = data => {
    return dispatch => {
      return axios
        .post(
          apiRoot + "/api/topic/addLike/" + data.id,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: data.authToken
            }
          }
        )
        .then(
          response => {
            if (response.data.like) {
              dispatch(likeAdded(response.data));
            } else {
              dispatch(likeRemoved(response.data));
            }
          },
          error => {
            dispatch(likeFail());
          }
        );
    };
  };

  export const addTopicDisLike = data => {
    return dispatch => {
      return axios
        .post(
          apiRoot + "/api/topic/addDisLike/" + data.id,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: data.authToken
            }
          }
        )
        .then(
          response => {
            if (response.data.disLike) {
              dispatch(disLikeAdded(response.data));
            } else {
              dispatch(disLikeRemoved(response.data));
            }
          },
          error => {
            dispatch(likeFail());
          }
        );
    };
  };
  
  export const setTopicData = (data, refresh) => {
    return {
      type: SET_TOPIC_DATA,
      data,
      refresh
    };
  };
  
  export const setTopicHasMore = data => {
    return {
      type: SET_TOPIC_HAS_MORE,
      data
    };
  };
  
  export const authorizationFail = () => {
    return {
      type: AUTHORIZATION_FAIL
    };
  };
  
  export const topicAdded = data => {
    return {
      type: TOPIC_ADDED,
      data
    };
  };
  
  export const topicEdited = data => {
    return {
      type: TOPIC_EDITED,
      data
    };
  };
  
  export const topicDeleted = data => {
    return {
      type: TOPIC_DELETED,
      data
    };
  };
  
  export const topicFail = () => {
    return {
      type: TOPIC_FAIL
    };
  };
  
  export const commentAdded = data => {
    return {
      type: TOPIC_COMMENT_ADDED,
      data
    };
  };
  
  export const commentEdited = data => {
    return {
      type: TOPIC_COMMENT_EDITED,
      data
    };
  };
  
  export const commentDeleted = data => {
    return {
      type: TOPIC_COMMENT_DELETED,
      data
    };
  };
  
  export const commentFail = () => {
    return {
      type: TOPIC_COMMENT_FAIL
    };
  };
  
  export const likeAdded = data => {
    return {
      type: TOPIC_LIKE_ADDED,
      data
    };
  };
  
  export const likeRemoved = data => {
    return {
      type: TOPIC_LIKE_REMOVED,
      data
    };
  };

  export const disLikeAdded = data => {
    return {
      type: TOPIC_DISLIKE_ADDED,
      data
    };
  };
  
  export const disLikeRemoved = data => {
    return {
      type: TOPIC_DISLIKE_REMOVED,
      data
    };
  };
  
  export const likeFail = () => {
    return {
      type: TOPIC_LIKE_FAIL
    };
  };
  
  export const setFetchingTopicDetails = data => {
    return {
      type: SET_FETCHING_TOPIC_DETAILS,
      data
    };
  };
  
  export const setTopicDetails = data => {
    return {
      type: SET_TOPIC_DETAILS,
      data
    };
  };
  