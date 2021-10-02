import './Assets/Css/App.css';
import Routes from "./Routes";
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
            {Routes()}
        </AppContext.Provider>
    );
}

export default App;
