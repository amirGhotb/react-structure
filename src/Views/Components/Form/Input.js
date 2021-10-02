import React from "react";

export default function Input({input, index, invalid = false}) {
    switch (input.type) {
        case 'text':
            return <label key={'input' + index} className={`${input.labelClass?? ''} has-validation w-100`} htmlFor="">
                {input.label}
                <input type="text" value={input.value} onChange={(e) => {
                    input.setValue(e.target.value)
                }} className={`form-control ${input.class} ${invalid !== false ? 'is-invalid' : ''}`}/>
                {
                    invalid !== false && <p className={'invalid-feedback'}>{invalid}</p>
                }
            </label>
        case 'numberFloat':
            return <label key={'input' + index} className={`${input.labelClass?? ''} has-validation w-100`} htmlFor="">
                {input.label}
                <input type="text" value={input.value} minLength={input.min} maxLength={input.max}
                       className={`form-control ${input.class} ${invalid ? 'is-invalid' : ''}`}
                       required={input.required}
                       onChange={(e) => {
                           if (!isNaN(parseFloat(e.target.value)) || e.target.value === '') {
                               input.setValue(e.target.value)
                           }
                       }}/>

                {
                    invalid !== false && <p className={'invalid-feedback'}>{invalid}</p>
                }
            </label>
        case 'numberInteger':
            return <label key={'input' + index} className={`${input.labelClass?? ''} has-validation w-100`} htmlFor="">
                {input.label}
                <input type="text" value={input.value} minLength={input.min} maxLength={input.max}
                       className={`form-control ${input.class} ${invalid ? 'is-invalid' : ''}`}
                       required={input.required}
                       onChange={(e) => {
                           if (!isNaN(parseInt(e.target.value)) || e.target.value === '') {
                               input.setValue(e.target.value)
                           }
                       }}/>
                {
                    invalid !== false && <p className={'invalid-feedback'}>{invalid}</p>
                }
            </label>
        case 'checkBox':
            return <div className="form-check has-validation">
                <input type="checkbox" className={`form-check-input ${invalid ? 'is-invalid' : ''}`} value={input.value}
                       onChange={(e) => {
                           input.setValue(e.target.checked)
                       }}/>
                <label className={`form-check-label ${input.labelClass?? ''}`}
                       htmlFor="exampleCheck1">{input.label}</label>
                {
                    invalid !== false && <p className={'invalid-feedback'}>{input.validation.text}</p>
                }
            </div>
        case 'textArea':
            return <label key={'input' + index} className={`${input.labelClass?? ''} has-validation`} htmlFor="">
                {input.label}
                <textarea name="" id="" cols={input.cols ?? 30}
                          className={`form-control ${invalid ? 'is-invalid' : ''}`} rows={input.cols ?? 5}
                          value={input.value}
                          onChange={(e) => input.setValue(e.target.value)}>

                </textarea>
                {
                    invalid !== false && <p className={'invalid-feedback'}>{invalid}</p>
                }
            </label>
        case 'custom':
            return input.view(input.value, input.setValue, invalid !== false)
        default:
            return null
    }
}
