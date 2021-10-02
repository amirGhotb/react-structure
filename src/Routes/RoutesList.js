import Home from "../Views/Pages/Public/Home";
import Login from "../Views/Pages/Auth/Login";
import NotFound from "../Views/Pages/NotFound";

export default function RoutesList() {
    return {
        auth: {
            prefix: 'auth',
            layoutName: 'auth',
            childes: {
                login: {
                    exact: false,
                    name: 'login',
                    path: 'login',
                    page: Login(),
                }
            },
        },
        public: {
            prefix: 'public',
            layoutName: 'panel',
            middleware: 'auth',
            childes: {
                home: {
                    exact: false,
                    name: 'home',
                    path: '',
                    page: Home(),
                }
            },
        },
        panel: {
            prefix: 'panel',
            layoutName: 'panel',
            middleware: 'auth',
            childes: {
                home: {
                    exact: false,
                    name: 'home',
                    path: 'home',
                    page: Home
                }
            }
        }
    }
}
