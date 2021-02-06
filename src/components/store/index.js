// import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createStore, applyMiddleware, combineReducers } from "./tyRedux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// 定义修改规则
function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            return state - 1;
        case "InputADD":
            return state + action.payload;
        case "InputMINUS":
            return state - action.payload;
        default:
            return state;
    }
}

// const store = createStore(combineReducers({ count: countReducer }), applyMiddleware(logger, thunk));
const store = createStore(countReducer, applyMiddleware(logger, thunk));

export default store;

function thunk({ dispatch, getState }) {
    return next => action => {
        if (typeof action === "function") {
            return action(dispatch, getState);
        }
        return next(action);
    };
}

function logger({ getState }) {
    return next => action => {
        console.log("====================================");
        console.log(action.type + "执⾏了！");
        const prevState = getState();
        console.log("prev state", prevState);
        const returnValue = next(action);
        const nextState = getState();
        console.log("next state", nextState);
        console.log("====================================");
        return returnValue;
    };
}