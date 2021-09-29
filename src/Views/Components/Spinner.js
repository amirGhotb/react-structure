import React, {useContext, useEffect, useState} from "react";
import HashLoader from "react-spinners/HashLoader";
import AppContext from "../../Storage/Contexts/AppContext";
import {css} from "@emotion/react";

export default function Spinner() {
    const context = useContext(AppContext)
    const [active, setActive] = useState(context.app.spinner ?? false)

    useEffect(() => {
        setActive(context.app.spinner)
    }, [context.app.spinner])

    const override = css`
      position: absolute;
      top: 35%;
      right: 46%;
    `;
    return <div className={`spinner-box ${active ? '' : 'd-none'}`}>
        <HashLoader loading={true} css={override} size={150}/>
    </div>
}
