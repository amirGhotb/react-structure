import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import cogoToast from 'cogo-toast';
import app from '../app.json'
import AppContext from "../Storage/Contexts/AppContext";
import {getRoutePath} from "../Routes/Routes";
export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default function (fetchData, postProcess, watch = [], condition = true) {
    let apiBaseUrl = `${app.baseApiUrl}/`;
    const [data, setData] = useState([{}, '', null]);
    const navigate = useNavigate()
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
                setData([
                    postProcess
                        ? postProcess(fetchData.urlName, response)
                        : response,
                    apiStates.SUCCESS]);
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
                    if ([401,419].includes(e.response?.status)) {
                        appContext.appDispatch({
                            type:'USER',
                            data:{}
                        })
                        navigate(getRoutePath('login'))
                        // window.location.reload();
                    }else if(e.response?.status === 500){
                        cogoToast.error('خطا در عملیات')
                    } else if(e.response?.status === 408){
                        appContext.appDispatch({
                            type:'USER',
                            data:{}
                        })
                        navigate(getRoutePath('home'))
                        cogoToast.error('حساب کاربری شما غیرفعال است لطفا با پشتیبانی تماس بگیرید')
                    }
                    console.log(e);
                    setData([postProcess
                        ? postProcess(fetchData.urlName, e?.response ?? {})
                        : e?.response??{}, apiStates.ERROR, e.response?.status ?? 500]);
                }).finally(() => {
                setSpinner(false)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch);

    return data;
}
