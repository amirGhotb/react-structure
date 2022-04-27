import React from "react";
import {persianNumberToEnglish} from "../../../Helper";
import SearchableSelect from "./SearchableSelect";

export default function Input({input, index, invalid = false}) {
    function getInput(){
        switch (input.type) {
            case 'numberFloat':
                return <input type="text" value={input.value} autoComplete={input.autoComplete} minLength={input.min} maxLength={input.max}
                       className={`form-control ${input.class} ${invalid ? 'is-invalid' : ''}`}
                       required={input.required}
                       disabled={input.disabled??false}
                       onChange={(e) => {
                           let temp = persianNumberToEnglish(e.target.value)
                           if (!isNaN(parseFloat(temp)) || temp === '') {
                               input.setValue(temp)
                           }
                       }}/>
            case 'numberInteger':
                return <input type="text" value={input.value} autoComplete={input.autoComplete} minLength={input.min} maxLength={input.max}
                              className={`form-control ${input.class} ${invalid ? 'is-invalid' : ''}`}
                              required={input.required}
                              disabled={input.disabled??false}
                              onChange={(e) => {
                                  let temp = persianNumberToEnglish(e.target.value)
                                  if (!isNaN(temp) || temp === '') {
                                      input.setValue(temp.toString().replace('.',''))
                                  }
                              }}/>
            case 'checkBox':
                return <div className="form-check has-validation">
                    <input id={'exampleCheck'+index} type="checkbox" disabled={input.disabled??false} className={`form-check-input ${invalid ? 'is-invalid' : ''}`} value={input.value}
                           onChange={(e) => {
                               input.setValue(e.target.checked)
                           }}/>
                    <label className={`form-check-label ${input.labelClass?? ''}`}
                           htmlFor={'exampleCheck'+index}>{input.label}</label>
                    {
                        invalid !== false && <p className={'invalid-feedback'}>{input.validation.text}</p>
                    }
                </div>
            case 'textArea':
                return <textarea disabled={input.disabled??false} autoComplete={input.autoComplete} name="" id="" cols={input.cols ?? 30}
                              className={`form-control ${invalid ? 'is-invalid' : ''}`} rows={input.cols ?? 5}
                              value={input.value}
                              onChange={(e) => input.setValue(e.target.value)}>

                </textarea>
            case 'select':
                return <select disabled={input.disabled??false}  className={`form-control ${input.class} ${invalid ? 'is-invalid' : ''}`} value={input.value}
                            onChange={(e) => input.setValue(e.target.value)}>
                        {
                            input.options.map((option,index)=>{
                                return <option key={'option'+index} value={option.value}>{option.text}</option>
                            })
                        }
                    </select>
            case 'searchableSelect':
                return <SearchableSelect options={input.options} classStyle={`${invalid ? 'is-invalid' : ''}`} setValue={input.setValue} value={input.value}/>
            case 'custom':
                return input.view(input.value, input.setValue, invalid !== false)
            default:
                return <input disabled={input.disabled??false} type={input.type} value={input.value} onChange={(e) => {
                        input.setValue(e.target.value)
                    }} autoComplete={input.autoComplete} className={`form-control ${input.class??''} ${invalid !== false ? 'is-invalid' : ''}`}/>
        }
    }
    if (!['checkBox','custom'].includes(input.type)) {
        return <label key={'input' + index} className={`${input.labelClass ?? ''} has-validation p-1`}>
            {
                input.redStar && <span className={'text-danger'}>*</span>
            }
            {input.label}
            {
                getInput()
            }
            {
                invalid !== false && <p className={'invalid-feedback mb-0'}>{invalid}</p>
            }
        </label>
    }else{
        return getInput()
    }
}
