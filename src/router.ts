import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { GroupRouteDefinition } from './types';
import { ADD_ON_ID, BASE_URL, generateGroupName } from './utils';

// Use dynamic imports to enable code-splitting
const DashboardPage = () => import('./pages/DashboardPage.vue');
const AlertsPage = () => import('./pages/AlertsPage.vue');
const FormPage = () => import('./pages/FormPage.vue');
const TableListing = () => import('./pages/TableListing.vue');
const ProductsPage = () => import('./components/ProductsListing/ProductsPage.vue');
const TableListingDetail = () => import('./pages/TableListingDetail.vue');
const ComponentsPage = () => import('./pages/ComponentsPage.vue');

export type AddOnRoute = Omit<RouteRecordRaw, "meta"> & { meta: GroupRouteDefinition };

export const routes: AddOnRoute[] = [
    {
        name: 'dashboard',
        path: '/',
        component: DashboardPage,
        meta: {
            id: 'dashboard',
            name: {
                'en': 'Dashboard',
                'de': 'Armaturenbrett'
            },
            icon: 'dashboard',
            path: BASE_URL + '/',
            sidebar: ADD_ON_ID,
            group: generateGroupName('general'),
        }
    },
    {
        path: '/table-listing',
        component: TableListing,
        redirect: { name: "products-page" },
        children: [
            {
                name: "products-page",
                path: "list",
                component: ProductsPage,
            },
            {
                name: "product-detail",
                path: ":id",
                component: TableListingDetail
            }
        ],
        meta: {
            id: 'table-listing',
            name: {
                'en': 'Table Listing',
                'de': 'Tabellenauflistung'
            },
            icon: 'data-table',
            path: BASE_URL + '/table-listing',
            sidebar: ADD_ON_ID,
            group: generateGroupName('general'),
        }
    },
    {
        path: '/form',
        component: FormPage,
        meta: {
            id: 'form',
            name: {
                'en': 'Form',
                'de': 'Form'
            },
            icon: 'search',
            path: BASE_URL + '/form',
            group: generateGroupName('general'),
        }
    },
    {
        path: '/alerts',
        component: AlertsPage,
        meta: {
            id: 'alerts',
            name: {
                'en': 'Alerts',
                'de': 'Alerts'
            },
            icon: 'warning',
            path: BASE_URL + '/alerts',
            group: generateGroupName('general'),
        }
    },
    {
        path: '/components',
        component: ComponentsPage,
        meta: {
            id: 'components',
            name: {
                'en': 'Components',
                'de': 'Components'
            },
            icon: 'ufo',
            path: BASE_URL + '/components',
            group: generateGroupName('general'),
        }
    },
];

export default createRouter({
    routes: routes as RouteRecordRaw[],
    // Make sure to set the base because all add-on pages will be under add-ons/demo
    history: createWebHashHistory(BASE_URL),
});

