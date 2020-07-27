import { combineReducers } from "redux";
import Home from "./Home";
import Topic from "./Topic";

const reducer = combineReducers({
  Home,
  topicState: Topic,
});

export default reducer;
