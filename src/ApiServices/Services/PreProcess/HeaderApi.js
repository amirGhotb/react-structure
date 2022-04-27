import React, {useContext} from 'react';
import AppContext from "../../../Storage/Contexts/AppContext";

export default function HeaderApi(auth = false, media = false) {
    const appContext = useContext(AppContext);
    const Headers = {
        'content-Type': media ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json',
    };
    if (auth) {
        Headers.Authorization = 'Bearer ' + appContext.app?.user?.token;
    }

    return Headers;
}
