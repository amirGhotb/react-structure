import logo from '../../../Assets/Images/logo.png'
import Form from '../../Components/Form'
import {useEffect, useState} from "react";
import api from "../../../ApiServices";
import {postProcessUserApi, preProcessUserApi} from "../../../ApiServices/Services/UserService";

export default function Login() {
    const [nationalCode, setNationCode] = useState('')
    const [password, setPassword] = useState('')
    const [post, setPost] = useState(false)

    const [data, status] = api(preProcessUserApi('auth-login', {
        nationalCode,
        password
    }), postProcessUserApi, [post], post)

    useEffect(() => {
        console.log(data, status);
        setPost(false)
    }, [status])

    return <>
        <main className={'container'}>
            <div className="container d-flex justify-content-center">
                <div className="row h-100 w-100 justify-content-center">
                    <div className="col-12 col-md-10 my-auto">
                        <div className="card rounded card-opacity auth-card bg-blue">
                            <div
                                className="text-center m-0 m-lg-2 bg-primary card p-2 d-flex flex-column align-items-center justify-content-center rounded">
                                <div className="px-1">
                                    <img src={logo} alt="" className={"logo-single"}/>
                                    <h2 className={'font-weight-bold text-white'}>راسپینا فراگستر</h2>
                                    <h6 className={'text-white mt-3'}>تولید کننده نرم افزارهای تخصصی پزشکی</h6>
                                    <div className={'card bg-light mt-4 py-3'}>
                                        <h4 className={'m-0 font-weight-bold text-primary'}>سامانه اسناد پزشکی
                                            راسپینا</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="form-side text-right">
                                <h6 className="mb-4">ورود</h6>
                                <Form inputs={[
                                    {
                                        type: 'text',
                                        label: 'شماره ملی',
                                        value: nationalCode,
                                        setValue: (v) => {
                                            setNationCode(v)
                                        },
                                        validation:{
                                            required:true,
                                            requiredFeedBack:'لطفا شماره ملی را وارد نمایید',
                                            regex:/^\D*(?:\d\D*){10,}$/,
                                            regexFeedBack: 'لطفا شماره ملی را به درستی وارد نمایید'
                                        }
                                    },
                                    {
                                        type: 'text',
                                        label: 'رمز عبور',
                                        value: '',
                                        validation:{
                                            required:true,
                                            requiredFeedBack:'لطفا رمز عبور را وارد نمایید',
                                            regex:/^\D*(?:\d\D*){8,}$/,
                                            regexFeedBack: 'لطفا رمز عبور را به درستی وارد نمایید'
                                        },
                                        setValue: () => {
                                        }
                                    }
                                ]} buttons={[
                                    {
                                        type: 'submit',
                                        class: 'btn btn-primary',
                                        text: 'ورود',
                                    }
                                ]} buttonsBoxClass={'d-flex justify-content-center'} submit={() => {
                                    setPost(true)
                                }}>

                                </Form>
                                <div className={'text-center mt-4 d-flex flex-column'}>
                                    <a className={'mb-2'} href='#'>ثبت نام مدیر سیستم
                                        کلینیک</a>
                                    <a href='#'>ثبت نام ارائه‌دهنده خدمت</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
}
