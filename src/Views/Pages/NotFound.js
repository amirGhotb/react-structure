// @flow
import * as React from "react";
import notFound from '../../Assets/Images/404.png'
export default function NotFound(): React.Node{
    return <div className={'not-found-box'}>
        <img src={notFound} alt="" className={'not-found-img'}/>
        <p>صفحه مورد نظر یافت نشد</p>
    </div>
}
