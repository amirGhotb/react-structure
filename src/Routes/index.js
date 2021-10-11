import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import {routes} from "./Routes";
import NotFound from "../Views/Pages/NotFound";
import Layout from "../Views/Layout/index"
import Middleware from "../Middleware"

export default function () {
    let routesList = routes();
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
                                            <Middleware name={item.middleware}>
                                                {route.page()}
                                            </Middleware>
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
