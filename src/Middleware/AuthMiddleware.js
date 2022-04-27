import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import AppContext from "../Storage/Contexts/AppContext";
import {getRoutePath} from "../Routes/Routes";

export default function AuthMiddleware(children) {
    const context = useContext(AppContext)
    const navigate = useNavigate();
    if (context.app?.user?.token) {
        return children;
    } else {
        navigate(getRoutePath('home'))
    }
    return <div/>
}
