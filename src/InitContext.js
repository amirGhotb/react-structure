import {useContext, useEffect, useState} from "react";
import {terminalNo, terminalPassword, terminalUsername} from "./app.json";
import api from "./ApiServices";
import {postProcessAuthApi, preProcessAuthApi} from "./ApiServices/Services/AuthService";
import AppContext from "./Storage/Contexts/AppContext";
import Routes from "./Routes";
import Store from "./Storage/Store";

export default function InitContext(){
    const context = useContext(AppContext)

    const initializeContext = {
        spinner: false,
    };

   
    return <>
        {Routes()}
    </>
}
