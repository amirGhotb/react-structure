import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../Assets/Sass/app.scss'
import Spinner from "../Components/Spinner";

export default function ({type = 'panel', children}) {
    let jsx = null
    switch (type) {
        case 'auth':
            jsx = <div>
                <div className="content-box main-background">
                    <Header/>
                    <div className={'d-flex flex-column flex-lg-row mt-3 container'}>
                        <div className={'container p-0'}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            break
        case 'panel':
            jsx = <div>
                <Spinner/>
                <Header/>
                <Sidebar/>
                {children}
                <Footer/>
            </div>
            break
        default:
            jsx = <div>
                {children}
            </div>
            break
    }
    return jsx
}
