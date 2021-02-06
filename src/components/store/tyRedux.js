export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }
    let currentState;
    let currentListeners = [];

    function getState() {
        return currentState;
    }
    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(listener => listener());
        return action;
    }
    function subscribe(listener) {
        currentListeners.push(listener);
        return () => {
            currentListeners = [];
        };
    }
    // redux源码中采用随机字符串拼接的方式，确保type不重叠
    dispatch({ type: "INIT@sdhid218sbckbck" })
    return {
        getState,
        dispatch,
        subscribe
    };
}

const compose = (...funcs) => {
    if (funcs.length === 0) {
        return args => args
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer);
        let dispatch = store.dispatch;
        const midApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        };
        const middlewareChain = middlewares.map(middleware => middleware(midApi));
        dispatch = compose(...middlewareChain)(store.dispatch);
        return {
            ...store,
            // 加强版的dispatch
            dispatch
        };
    };
}

export const combineReducers = (reducers) => {
    return function combination(state = {}, action) {
        let nextState = {}
        let hasChanged = false
        for (let key in reducers) {
            const reducer = reducers[key]
            nextState[key] = reducer(state[key], action)
            hasChanged = hasChanged || nextState[key] !== state[key]
        }
        hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
        return hasChanged ? nextState : state
    }
}
