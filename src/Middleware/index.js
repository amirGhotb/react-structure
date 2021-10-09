import AuthMiddleware from "./AuthMiddleware";

export default function ({name = null, children}) {
    let middlewares = {
        auth: AuthMiddleware
    }
    return Object.keys(middlewares).includes(name) ? middlewares[name](children) : children;
}
