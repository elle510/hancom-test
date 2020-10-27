import loadable from '@loadable/component';

const List = loadable(() => import('pages/List'), 'Loading...');
const Player = loadable(() => import('pages/Player'), 'Loading...');

const routes = () => [
    {
        path: '/list',
        component: List,
        routes: [{ path: '/list/:videoId', component: Player }],
    },
];

export default routes;
