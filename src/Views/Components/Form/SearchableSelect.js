import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleDown, faArrowCircleUp, faTimes} from "@fortawesome/free-solid-svg-icons";

export default function SearchableSelect({value, setValue, options = [], classStyle}) {
    const [selectShow, setSelectShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [text, setText] = useState('');
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSelectShow(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        let temp = options.filter(item => item.value === value);
        setSelected(temp[0]??null)
    }, [value,options])


    // useEffect(() => {
    //     console.log(selected, 'ddd', selectShow);
    // }, [selected, selectShow])

    return <div ref={wrapperRef}>
        <div  className={`position-relative ${!selectShow ? 'd-flex ' : 'd-none '}`}>
            <input onClick={() => {
                setSelectShow(true)
            }} type="text" value={selected?.text ?? 'انتخاب کنید...'} className={'form-control border btn'}/>
            <button type={'button'} className={'border-0 bg-transparent p-0'}>
                <FontAwesomeIcon className={'open-suggest-list open-suggest-list-icon clickable text-secondary'}
                                 icon={selectShow ? faArrowCircleUp : faArrowCircleDown}/>
            </button>
        </div>

        <div className={`position-relative ${selectShow ? 'd-flex ' : 'd-none '}` + classStyle}>
            <input type="text" value={text ?? ''}
                   onChange={(e) => setText(e.target.value)}
                   className={'form-control '}/>
            <button type={'button'} onClick={() => setSelectShow(false)} className={'border-0 bg-transparent p-0'}>
                <FontAwesomeIcon className={'open-suggest-list open-suggest-list-icon clickable text-secondary'}
                                 icon={selectShow ? faArrowCircleUp : faArrowCircleDown}/>
            </button>
            <div className={'select-scroll-y'} >
                <div className={'dropdown-menu select-list show p-0'}>
                    {options.length > 0 &&
                    <ul className={'m-0 p-0 select-scroll'}>
                        {options.filter(item => item.text.indexOf(text) >= 0).map((item, index) => {
                            return <li
                                key={'item' + index}
                                className={`clickable-select-item ${index !== options.length - 1 ? 'border-bottom' : ''} py-1`}
                            >
                                <button type={'button'} className={'btn w-100'} onClick={() => {
                                    setSelectShow(false)
                                    setSelected(item)
                                    setValue(item.value)
                                }}>
                                    {item.text}
                                </button>
                            </li>
                        })}
                    </ul>}
                    {options.length === 0 &&
                    <p className={'m-0 mb-2'}>موردی برای انتخاب وجود ندارد</p>
                    }
                </div>
            </div>
        </div>
    </div>
}