import SessionStore from "../SessionStore";

const initializeContext = {
    spinner: false
};

const login = (prevState, action) => {
    SessionStore.store('USER_INFO', action.data).then();
    return {
        ...prevState,
        ...action.data,
    };
};

const init = (prevState) => {
    return {
        ...prevState,
        ...initializeContext,
    };
};

const spinner = (prevState, action) => {
    return {
        ...prevState,
        spinner: action.spinner,
    };
};

function AppReducer(prevState, action) {
    switch (action.type) {
        case 'USER':
            return login(prevState, action);
        case 'INIT':
            return init(prevState);
        case 'SPINNER':
            return spinner(prevState, action);
        default:
            throw new Error();
    }
}

export default AppReducer;
