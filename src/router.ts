import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { routes } from '@/routes';
import { BASE_URL } from './utils';

export default createRouter({
    routes: routes as RouteRecordRaw[],
    // Make sure to set the base because all add-on pages will be under add-ons/demo
    history: createWebHashHistory(BASE_URL),
});

