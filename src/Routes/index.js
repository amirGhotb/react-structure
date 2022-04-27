import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {getRoutePath, routes} from "./Routes";
import Layout from "../Views/Layout/index"
import Middleware from "../Middleware"

export default function () {
    let routesList = routes();

    function makePath(parent, route) {
        let temp = parent.prefix ? `${parent.prefix}/${route.path}` : `${route.path}`;
        (route.params ?? []).forEach(item => {
            temp += '/:' + item
        })
        return temp
    }

    return <BrowserRouter>
        <Routes>
            {
                Object.values(routesList).map((item, indexParent) => {
                    return Object.values(item.childes).map((route, index) => {
                        return <Route key={`route-${indexParent}-${index}`}
                                      exact={route.exact}
                                      path={makePath(item, route)}
                                      element={<Layout type={route.layoutName ?? item.layoutName}>
                                          <Middleware name={route.middleware ?? item.middleware}>
                                              {route.page}
                                          </Middleware>
                                      </Layout>}
                        />
                    })

                })
            }
        </Routes>
    </BrowserRouter>
}
