import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../Assets/Sass/app.scss'
import Spinner from "../Components/Spinner";

export default function ({type = 'panel', children}) {
    console.log(children, type, 'hello');
    let jsx = null
    switch (type) {
        case 'auth':
            jsx = <div>
                <Spinner/>
                {children}
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
            jsx = <div/>
            break
    }
    console.log(jsx);
    return jsx
}
