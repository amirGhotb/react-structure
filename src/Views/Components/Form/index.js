import React, {useContext, useEffect, useState} from "react";
import Input from "./Input";
import cogoToast from "cogo-toast";
import AppContext from "../../../Storage/Contexts/AppContext";

export default function ({
                             submit = () => {
                             }, inputs = [], formClass = '', buttons = [], buttonsBoxClass = ''
                         }) {
    const [invalid, setInvalid] = useState({list: inputs.map(() => false)})
    const context = useContext(AppContext)
    return <form className={formClass} onSubmit={(e) => {
        e.preventDefault()
        let temp = invalid.list
        inputs.forEach((item, index) => {
                if (item.validation?.required && item.value === '') {
                    temp[index] = item.validation.requiredFeedBack ?? ''
                } else if (item.validation?.regex && !item.validation.regex.test(item.value)) {
                    temp[index] = item.validation.regexFeedBack ?? ''
                } else {
                    temp[index] = false
                }
            }
        )
        setInvalid({...invalid, list: temp})
        if (temp.filter(item => !item).length === temp.length) {
            submit()
        } else {
            cogoToast.error('لطفا موارد فرم را به درستی تکمیل نمایید')
        }
    }
    }>
        {inputs.map((input, index) => {
            return <Input input={input} index={index} invalid={invalid.list[index]}/>
        })}
        <div className={buttonsBoxClass}>
            {
                buttons.map((button, index) => {
                    return <button key={'btn-' + index} className={'btn btn-'+ button.class}
                                   disabled={button.disabled ?? false} type={button.type}
                                   onClick={() => button.onClick ? button.onClick() : null}>{button.text}</button>
                })
            }
        </div>
    </form>
}
