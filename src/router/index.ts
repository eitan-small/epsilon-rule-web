import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/project/:id?',
      name: 'project',
      component: () => import('@/views/project/index.vue'),
    },
  ],
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
