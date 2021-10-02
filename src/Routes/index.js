import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import RoutesList from "./RoutesList";
import NotFound from "../Views/Pages/NotFound";
import Layout from "../Views/Layout/index"
import Middleware from "../Middleware"

export default function () {
    let routesList = RoutesList();
    return <Router>
        <Switch>
            {
                Object.values(routesList).map((item, indexParent) => {
                    return <Route key={`route-${indexParent}`} path={`/${item.prefix}/:path?`} exact>
                        <Layout type={item.layoutName}>
                            <Switch>
                                {
                                    Object.values(item.childes).map((route, index) => {
                                        return <Route key={`route-${indexParent}-${index}`}
                                                      exact={route.exact}
                                                      path={`/${item.prefix}/${route.path}`}
                                        >
                                            <Middleware name={item.middleware} children={route.page}/>
                                        </Route>
                                    })
                                }
                            </Switch>
                        </Layout>
                    </Route>
                })
            }
            <Route component={NotFound}/>
        </Switch>
    </Router>
}
