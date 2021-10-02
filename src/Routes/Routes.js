import Home from "../Views/Pages/Public/Home";
import Login from "../Views/Pages/Auth/Login";

function routes() {
    return {
        auth: {
            prefix: 'auth',
            layoutName: 'auth',
            childes: {
                login: {
                    exact: false,
                    name: 'auth-login',
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

function getRoutePath(name) {
    let routePath = ''
    Object.values(routes()).forEach(item => {
        let path = `/${item.prefix}/`;
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
