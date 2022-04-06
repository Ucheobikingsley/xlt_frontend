import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },

  {
    path: '/myaccount',
    name: 'Ads',
    component: () => import('@/pages/MyAccount.vue'),
    meta: {
      needSideBar: true,
    },
  },

  {
    path: '/postads',
    name: 'Post',
    component: () => import('@/pages/Post.vue'),
  },

  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/pages/Feedback.vue'),
    meta: {
      needSideBar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
