import React, {useContext, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import AppContext from "../Storage/Contexts/AppContext";
import RoutesList from "../Routes/RoutesList";

export default function AuthMiddleware(children) {
    const appContext = useContext(AppContext)
    const history = useHistory()
    if (appContext.app?.apiToken) {
        return children;
    } else {
        history.push('/'+RoutesList().auth.prefix+'/'+RoutesList().auth.childes.login.path)
    }
    return <div></div>
}
