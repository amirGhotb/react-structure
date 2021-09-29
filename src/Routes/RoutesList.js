import Home from "../Views/Pages/Public/Home";

export default function RoutesList() {
    return [
        {
            prefix: '',
            childes: [
                {
                    exact: false,
                    name: 'home',
                    path: '',
                    page: Home,
                }
            ],
        },
        {
            prefix: 'admin',
            childes: [
                {
                    exact: false,
                    name: 'home',
                    path: '',
                    page: Home,
                    middleware: 'auth'
                }
            ]
        }
    ]
}
