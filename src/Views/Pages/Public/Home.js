import Form from '../../Components/Form'
import {useEffect, useState} from "react";
import api from '../../../ApiServices'
import {postProcessUserApi, preProcessUserApi} from '../../../ApiServices/Services/UserService'
import Middleware from '../../../Middleware'

export default function Home() {
    const [name, setName] = useState('')
    const [post, setPost] = useState(false)
    console.log('aaa');
    const [data, status] = api(preProcessUserApi('test', {
        name: 'aaaa'
    }), postProcessUserApi, [post], post)

    useEffect(() => {
        console.log(status);
        setPost(false)
    }, [status])

    useEffect(() => {
        console.log(post);
    }, [post])

    return <div>
        <Form formClass={'d-flex flex-column'} inputs={[
            {
                type: 'textArea',
                label: 'نام',
                value: name,
                setValue: (v) => setName(v),
                validation: {
                    required: true,
                    requiredFeedBack: 'لطفا نام را تکمیل کنید',
                    regex: /09([0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
                    regexFeedBack: 'شماره نادرست است'
                }
            },
            {
                type: 'custom',
                value: name,
                setValue: (v) => setName(v),
                validation: {
                    required: true,
                    requiredFeedBack: 'aaaaa'
                },
                view: (value, setValue, isInvalid) => {
                    return <label htmlFor="">
                        hello
                        <input type="text" className={`form-control`} value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }}/>
                        {isInvalid && <p>sadlfsdffff</p>}
                    </label>
                }
            }
        ]}
              buttons={[
                  {
                      type: 'submit',
                      text: 'ثبت',
                      class: 'success',
                  }
              ]}
              submit={() => {
                  setPost(true)
              }}
        />
    </div>
}
