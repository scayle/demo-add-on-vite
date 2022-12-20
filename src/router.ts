import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Use dynamic imports to enable code-splitting
const DashboardPage = () => import('./pages/DashboardPage.vue');
const AlertsPage = () => import('./pages/AlertsPage.vue');
const FormPage = () => import('./pages/FormPage.vue');
const TableListing = () => import('./pages/TableListing.vue');
const ComponentsPage = () => import('./pages/ComponentsPage.vue');

const routes: RouteRecordRaw[] = [
    { name: 'dashboard', path: '/', component: DashboardPage },
    { path: '/table-listing', component: TableListing },
    { path: '/form', component: FormPage },
    { path: '/alerts', component: AlertsPage },
    { path: '/components', component: ComponentsPage },
];

const ADD_ON_ID = import.meta.env.PANEL_ADDON_IDENTIFIER;
const BASE_URL = `add-ons/${ADD_ON_ID}`;

export default createRouter({
    routes,
    // Make sure to set the base because all add-on pages will be under add-ons/demo
    history: createWebHistory(BASE_URL),
});

