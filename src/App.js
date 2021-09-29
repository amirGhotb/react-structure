import './Assets/Css/App.css';
import Routes from "./Routes";
import Layout from "./Views/Layout"
import {useEffect, useReducer} from "react";
import AppReducer from "./Storage/Reducers/AppReducer";
import AppContext from "./Storage/Contexts/AppContext";

function App() {
    const [app, appDispatch] = useReducer(AppReducer, {});

    useEffect(()=>{
        appDispatch({
            type: 'INIT',
        });
    },[])

    return (
        <AppContext.Provider value={{app, appDispatch}}>
            <Layout dir={'rtl'} content={Routes()}/>
        </AppContext.Provider>
    );
}

export default App;