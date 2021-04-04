import { createStore } from "redux";
import userInfoReducer from "./reducer";

const store = createStore(userInfoReducer);

export default store;
