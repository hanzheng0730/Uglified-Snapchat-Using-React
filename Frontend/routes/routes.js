import Login from '../pages/login'
import Home from '../pages/home'
import Start from '../pages/start'
import Register from '../pages/register'
import Admin from '../pages/admin'
import Setting from '../pages/setting'
// import NoMatch from '../pages/noMatch'

const routes = [
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/start',
        exact: true,
        //change to flase
        auth: false,
        component: Start
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/',
        exact: true,
        //change to false
        auth: false,
        component: Home
    },
    {
        path: '/admin',
        exact: true,
        auth: false,
        component: Admin
    },
    {
        path: '/setting',
        exact: true,
        auth: false,
        component: Setting
    },
    // {
    //     path: '/playlist/:pls',
    //     exact: true,
    //     auth: false,
    //     component: Home
    // },
    // {
    //     path: '/playlist/:pls/:channel',
    //     exact: false,
    //     auth: false,
    //     component: Home
    // },
    // {
    //     path: '',
    //     exact: false,
    //     auth: false,
    //     component: NoMatch
    // }
];

export default routes;