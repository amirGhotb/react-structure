import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import AppContext from "../Storage/Contexts/AppContext";
import {getRoutePath} from "../Routes/Routes";

export default function AuthMiddleware(children) {
    const appContext = useContext(AppContext)
    const history = useHistory()
    if (appContext.app?.apiToken) {
        return children;
    } else {
        history.push(getRoutePath('auth-login'))
    }
    return <div/>
}
