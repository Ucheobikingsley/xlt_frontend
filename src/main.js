import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router/index';
import 'nprogress/nprogress.css';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon';
import VueEasyLightbox from 'vue-easy-lightbox';
import Toast from 'vue-toastification';
import Multiselect from '@/components/Multiselect/multiselect.vue';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
import 'devextreme/dist/css/dx.light.css';

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
// import axios from 'axios'

import '@yzfe/svgicon/lib/svgicon.css';

export const app = createApp(App);
export const nprogress = useNProgress(0.5, {
  minimum: 0.1,
  showSpinner: true,
  trickle: true,
});
nprogress.isLoading.value = true;

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    nprogress.isLoading.value = true;
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  if (router.currentRoute.value === to && nprogress.isLoading.value)
    nprogress.isLoading.value = false;
});
app.component('CVSelect', Multiselect);
app.use(VueSvgIconPlugin, {
  tagName: 'icon',
});
app.use(Toast);
app.use(router);
// app.use(axios);
app.use(VueEasyLightbox);
app.use(VueReCaptcha, {
  siteKey: '6LfTwY8dAAAAAGHKb3N1o4NzWMoXRpALBq44SKip',
});

console.log('router is ready');
app.mount('#app');
