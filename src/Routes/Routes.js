import Home from "../Views/Pages/Public/Home";
import Login from "../Views/Pages/Auth/Login";
import NotFound from "../Views/Pages/NotFound";

function routes() {
    return {
        authLogin: {
            prefix: '/main/auth',
            layoutName: 'auth',
            middleware:'logout',
            childes: {
                login: {
                    exact: true,
                    name: 'auth-login',
                    path: 'login',
                    page: <Login/>,
                },
            },
        },
        public: {
            prefix: '',
            layoutName: 'main',
            middleware: '',
            childes: {
                home: {
                    exact: true,
                    name: 'home',
                    path: '',
                    page: <Home/>,
                },
            },
        },
        notFound:{
            prefix: '/main',
            layoutName: '',
            middleware: '',
            childes: {
                notFound: {
                    exact: false,
                    name: 'notFound',
                    path: '*',
                    page: <NotFound/>
                },
            }
        },
    }
}

function getRoutePath(name) {
    let routePath = ''
    Object.values(routes()).forEach(item => {
        let path = `${item.prefix + (item.prefix !== ''? '/' : '')}`;
        Object.values(item.childes).forEach(child => {
            if (name === child.name) {
                routePath = path + child.path
            }
        })
    })

    return routePath
}

export {
    routes, getRoutePath
}
