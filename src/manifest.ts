// This config function does nothing but return its input
// But it does provide some helpful type hints
import { config, RouteDefinition } from '@scayle/add-on-utils';

type GroupRouteDefinition = RouteDefinition | { isGroup: boolean }

// TODO: Eventually these will be passed as an argument in the config function
const ADD_ON_ID = import.meta.env.PANEL_ADDON_IDENTIFIER;
const BASE_URL = `/add-ons/${ADD_ON_ID}`;

const generateGroupName = (name: string) => ADD_ON_ID + '::' + name;
const applyDefaultRouteProps = (routes: RouteDefinition[]) => routes.map(route => ({...route, sidebar: ADD_ON_ID}));

const generalRoutes: GroupRouteDefinition[] = [
    {
        id: 'general-group',
        name: {
            'en': 'General',
            'de': 'Allgemeines'
        },
        group: generateGroupName('general'),
        isGroup: true,
    },
    {
        id: 'dashboard',
        name: {
            'en': 'Dashboard',
            'de': 'Armaturenbrett'
        },
        icon: 'dashboard',
        path: BASE_URL + '/',
        sidebar: ADD_ON_ID,
        children: [],
        group: generateGroupName('general'),
    },
    {
        id: 'table-listing',
        name: {
            'en': 'Table Listing',
            'de': 'Tabellenauflistung'
        },
        icon: 'data-table',
        path: BASE_URL + '/table-listing',
        sidebar: ADD_ON_ID,
        children: [],
        group: generateGroupName('general'),
    },
    {
        id: 'form',
        name: {
            'en': 'Form',
            'de': 'Form'
        },
        icon: 'search',
        path: BASE_URL + '/form',
        group: generateGroupName('general'),
    },
    {
        id: 'alerts',
        name: {
            'en': 'Alerts',
            'de': 'Alerts'
        },
        icon: 'warning',
        path: BASE_URL + '/alerts',
        group: generateGroupName('general'),
    },
    {
        id: 'components',
        name: {
            'en': 'Components',
            'de': 'Components'
        },
        icon: 'ufo',
        path: BASE_URL + '/components',
        group: generateGroupName('general'),
    }
];

const manifestRegistration = config(function (registerApplication, registerRoutes) {
    registerApplication({
        name: ADD_ON_ID,
        // Make sure to use a dynamic import to create a code-split point
        // and minimize the size of the manifest since it is loaded on every page
        app: () => import('./add-on'),
    });

    registerRoutes({
        [ADD_ON_ID]: [
            ...applyDefaultRouteProps(generalRoutes as RouteDefinition[]),
        ]
    })
});

// !!!!!DO NOT CHANGE LINE BELOW
// IT IS USED FOR HOT RELOADING ON CLOUD PANEL ADDON
// AND WILL BREAK IF THE LINE BELOW IS CHANGED
export default manifestRegistration;
