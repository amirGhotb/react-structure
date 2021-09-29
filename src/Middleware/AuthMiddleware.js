import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import routes from "../routes";
import AppContext from "../Storage/Contexts/AppContext";

export default function AdminRequireLoginMiddleware(screen) {
    const appContext = useContext(AppContext)
    const history = useHistory()
    if (appContext.app?.apiToken !== '') {
        return screen;
    } else {
        history.push(routes.auth.login)
    }
    return <div></div>
}
