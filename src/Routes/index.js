import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import RoutesList from "./RoutesList";
import NotFound from "../Views/Pages/NotFound";

export default function () {
    let routesList = RoutesList();
    return <Router>
        <Switch>
            {
                routesList.map((item, indexParent) => {
                    return item.childes.map((route, index) => {
                        return <Route key={`route-${indexParent}-${index}`} exact={route.exact}
                                      path={`/${item.prefix}/${route.path}`}
                                      component={route.page}/>
                    })
                })
            }
            <Route component={NotFound}/>
        </Switch>
    </Router>
}
