import {AuthMiddleware} from "./AuthMiddleware";

export default function (name) {
    let middlewares = {
        auth: AuthMiddleware
    }

    return middlewares[name];
}
