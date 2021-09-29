import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import cogoToast from 'cogo-toast';
import app from '../app.json'
import AppContext from "../Storage/Contexts/AppContext";
import Store from "../Storage/Store";

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default function (fetchData, postProcess, watch = [], condition = true) {
    let apiBaseUrl = `${app.baseApiUrl}/`;
    const [data, setData] = useState([{}, '', null]);
    const history = useHistory()
    const appContext = useContext(AppContext)
    const setSpinner = (active = false) => {
        appContext.appDispatch({
            type: 'SPINNER',
            spinner: active
        })
    }
    useEffect(() => {
        if (condition) {
            setSpinner(true)
            setData([{}, apiStates.LOADING, null]);
            axios({
                method: fetchData.method,
                url: apiBaseUrl + fetchData.url,
                headers: fetchData.headers,
                data: fetchData.data
            }).then((response) => {
                if (response.status !== 200) {
                    setData([{}, apiStates.ERROR, response.status]);
                    return null;
                }
                return response.data;
            })
                .then((response) => {
                    if (response) {
                        setData([
                            postProcess
                                ? postProcess(fetchData.urlName, response)
                                : response,
                            apiStates.SUCCESS]);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    if (e.response?.status === 401) {
                        Store.remove('USER_INFO')
                        history.push('/login')
                    }
                    console.log(e);
                    cogoToast.error('خطا در عملیات')
                    setData([{}, apiStates.ERROR, e.response?.status ?? 500]);
                }).finally(() => {
                setSpinner(false)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch);

    return data;
}
