import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import genre from "./genreReducer";
import user from "./userReducer";

export default combineReducers({ auth, alert, genre, user });
