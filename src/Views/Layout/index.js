import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../Assets/Sass/app.scss'
import Spinner from "../Components/Spinner";

export default function ({content, dir}) {
    return <div dir={dir}>
        <Spinner/>
        <Header/>
        <Sidebar/>
        {content}
        <Footer/>
    </div>
}
