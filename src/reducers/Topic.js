import {
  AUTHORIZATION_FAIL,
  SET_TOPIC_DATA,
  SET_TOPIC_HAS_MORE,
  TOPIC_ADDED,
  TOPIC_FAIL,
  TOPIC_EDITED,
  TOPIC_DELETED,
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
  SET_FETCHING_TOPIC_DETAILS,
  CLOSE_SNACKBAR
} from "../actions/ActionType";

const initialState = {
  snackbar: {
    msg: null,
    show: false
  },
  topics: [],
  topicHasMore: true,
  fetchingTopicDetails: false
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPIC_DATA:
      let topicsObjects = {};
      state.topics.map(topic => { topicsObjects[topic.title + topic.id] = topic; });
      action.data.map(topic => {
        topicsObjects[topic.title + topic.id] = topicsObjects[topic.title + topic.id] ? { ...topicsObjects[topic.title + topic.id], ...topic } : topic;
      });
      return Object.assign({}, state, {
        topics: action.refresh ? action.data : Object.values(topicsObjects)
      });

    case SET_TOPIC_HAS_MORE:
      return Object.assign({}, state, { topicHasMore: action.data });

    case SET_FETCHING_TOPIC_DETAILS:
      return Object.assign({}, state, {
        fetchingTopicDetails: action.data
      });

    case SET_TOPIC_DETAILS:
      let topics = [];
      topics = Array.from(state.topics);
      let index = topics.findIndex(topic => {
        return topic.id == action.data.id;
      });
      if (index > -1) {
        topics[index] = action.data;
      } else {
        topics.push(action.data);
      }
      return Object.assign({}, state, { topics: topics });

    case TOPIC_ADDED:
      return Object.assign({}, state, {
        topics: [action.data].concat(state.topics),
        snackbar: { msg: "Your Topic is Added", show: true }
      });

    case TOPIC_FAIL:
      return Object.assign({}, state, {
        snackbar: {
          msg: "Error while adding your topic, please try again",
          show: true
        }
      });

    case TOPIC_EDITED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          state.topics[i].title = action.data.title;
          state.topics[i].description = action.data.description;
          state.topics[i].imageUrl = action.data.imageUrl;
          state.topics[i].videoId = action.data.videoId;
          state.topics[i].siteLink = action.data.siteLink;
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Your Topic is Edited", show: true }
      });

    case TOPIC_DELETED:
      return Object.assign({}, state, {
        topics: state.topics.filter(topic => topic.id != action.data),
        snackbar: { msg: "Your Topic is Deleted", show: true }
      });

    case TOPIC_COMMENT_ADDED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          state.topics[i].comments.push(action.data.comments);
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Your Comment Added", show: true }
      });

    case TOPIC_COMMENT_EDITED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          for (var j = 0; j < state.topics[i].comments.length; j++) {
            if (state.topics[i].comments[j]._id == action.data.commentId) {
              state.topics[i].comments[j].comment = action.data.comment;
            }
          }
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Your Comment Edited", show: true }
      });

    case TOPIC_COMMENT_DELETED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          for (var j = 0; j < state.topics[i].comments.length; j++) {
            if (state.topics[i].comments[j]._id == action.data.commentId) {
              state.topics[i].comments.splice(j, 1);
            }
          }
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Your comment is deleted", show: true }
      });

    case TOPIC_COMMENT_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Error, Please Login", show: true }
      });

    case TOPIC_LIKE_ADDED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          state.topics[i].likes = action.data.likes;
          state.topics[i].disLikes = action.data.disLikes;
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Your Like Added", show: true }
      });

    case TOPIC_LIKE_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Error, Please Login", show: true }
      });

    case TOPIC_LIKE_REMOVED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          state.topics[i].likes = action.data.likes;
          state.topics[i].disLikes = action.data.disLikes;
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "Liked is removed", show: true }
      });
    
      case TOPIC_DISLIKE_ADDED:
      for (var i = 0; i < state.topics.length; i++) {
        if (state.topics[i].id == action.data.id) {
          state.topics[i].disLikes = action.data.disLikes;
          state.topics[i].likes = action.data.likes;
        }
      }
      return Object.assign({}, state, {
        topics: state.topics,
        snackbar: { msg: "You have Disliked", show: true }
      });

      case TOPIC_DISLIKE_REMOVED:
        for (var i = 0; i < state.topics.length; i++) {
          if (state.topics[i].id == action.data.id) {
            state.topics[i].disLikes = action.data.disLikes;
            state.topics[i].likes = action.data.likes;
          }
        }
        return Object.assign({}, state, {
          topics: state.topics,
          snackbar: { msg: "Disliked is removed", show: true }
        });

    case AUTHORIZATION_FAIL:
      return Object.assign({}, state, {
        snackbar: { msg: "Un-Authorised, Please Login", show: true }
      });

    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: { msg: state.snackbar.msg, show: false }
      });

    default:
      return state;
  }
};

export default topicsReducer;
