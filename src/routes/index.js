import loadable from '@loadable/component';

// import Player from 'pages/Player';

// 템플릿
const List = loadable(() => import('pages/List'), 'Loading...');
const Player = loadable(() => import('pages/Player'), 'Loading...');
// const Crud = loadable(() => import('pages/templates/crud/Crud'), 'Loading...');
// const CrudFormContainer = loadable(
//     () => import('pages/templates/crud/CrudFormContainer'),
//     'Loading...',
// );
// const Wizard = loadable(
//     () => import('pages/templates/wizard/Wizard'),
//     'Loading...',
// );
// const TabPages = loadable(
//     () => import('pages/templates/tabpages/TabPages'),
//     'Loading...',
// );

const routes = () => [
    {
        path: '/list',
        component: List,
        routes: [{ path: '/list/player', component: Player }],
    },
    // {
    //     path: '/crud',
    //     component: Crud,
    //     auth: constAuth.AUTH_NONE,
    //     breadcrumbRoutes: [
    //         { label: translate('template'), path: '/template' },
    //         { label: translate('crud') },
    //     ],
    // },
    // {
    //     path: '/crud/:id',
    //     component: CrudFormContainer,
    //     auth: constAuth.AUTH_NONE,
    //     breadcrumbRoutes: [
    //         { label: translate('template'), path: '/template' },
    //         { label: translate('crud'), path: '/crud' },
    //         {},
    //     ],
    // },
    // {
    //     path: '/wizard',
    //     component: Wizard,
    //     auth: constAuth.AUTH_NONE,
    //     breadcrumbRoutes: [
    //         { label: translate('template'), path: '/template' },
    //         { label: translate('wizard') },
    //     ],
    // },
    // {
    //     path: '/tab-pages',
    //     component: TabPages,
    //     auth: constAuth.AUTH_NONE,
    //     breadcrumbRoutes: [
    //         { label: translate('template'), path: '/template' },
    //         { label: translate('tabpages') },
    //     ],
    // },
];

export default routes;
