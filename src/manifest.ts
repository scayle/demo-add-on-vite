// This config function does nothing but return its input
// But it does provide some helpful type hints
import { config, RouteDefinition } from '@scayle/add-on-utils';
import { AddOnRoute, routes } from './routes';
import { GroupRouteDefinition } from './types';
import { ADD_ON_ID, generateGroupName } from './utils';

const applyDefaultRouteProps = (routes: RouteDefinition[]) => routes.map(route => ({...route, sidebar: route.sidebar === null ? null : ADD_ON_ID}));

const mappedRoutes = routes.map(originalRoute => {
    const route = JSON.parse(JSON.stringify(originalRoute)) as AddOnRoute;
    const children = route.children;
    const meta = route.meta as RouteDefinition;

    if(children && children.length && !meta.children) {
        meta.children = children.map(childRoute => {
            const pathArray = childRoute.path.split("/");
            const pathForManifest = pathArray[pathArray.length - 1];

            // if the path for the manifest also contains the path of the parent,
            // the active item highlighting in the sidebar does not work that's what the lines above are for

            return "/" + pathForManifest;
        });
    }

    return meta;
});

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
    ...mappedRoutes
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
