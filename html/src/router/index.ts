import { createRouter, createWebHistory } from 'vue-router';

const routes: any = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('../views/Wallet.vue'),
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: () => import('../views/Navigation.vue'),
  },
  {
    path: '/actions/:name',
    name: 'actions',
    component: () => import('../views/Actions.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
