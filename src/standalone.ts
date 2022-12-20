// This entrypoint is used to create a standalone version of the app as
// an alternative to loading it as an add-on
import { createApp } from 'vue';
import { initVuePlugins } from '@/vue-bootstrap';
import App from './App.vue';

const app = createApp(App);

initVuePlugins(app);

app.mount("#app");
