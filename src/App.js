import './Assets/Css/App.css';
import {useContext, useEffect, useReducer, useState} from "react";
import AppReducer from "./Storage/Reducers/AppReducer";
import AppContext from "./Storage/Contexts/AppContext";
import InitContext from "./InitContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    const [app, appDispatch] = useReducer(AppReducer, {});
    useEffect(()=>{
        AOS.init();
    },[])
    return (
        <AppContext.Provider value={{app, appDispatch}}>
            <InitContext/>
        </AppContext.Provider>
    );
}

export default App;
