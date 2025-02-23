import { useGlobal } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component:  async () => await import('@/views/Index.vue')
  },
  {
    path: '/team',
    name: 'TeamOverview',
    component: async () => await import('@/views/TeamOverview.vue'),
  },
  {
    path: '/challenge/:id',
    name: 'ChallengeView',
    component: async () => await import('@/views/Challenge.vue'),
    props: true,
  },
  {
    path: "/results",
    name: 'GameResults',
    component: async () => await import('@/views/Results.vue'),
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: async () => await import('@/views/NotFound.vue'),
  },
  // Statistic
  // {
  //   path: "/statistic",
  //   name: 'Statistic',
  //   component: import('@/views/statistic/IndexView.vue')
  // },
  // {
  //   path: "/realtime/statistic",
  //   name: 'Realtime-Statistic',
  //   component: async () => await import('@/views/realtime_statistic/IndexView.vue')
  // },
];

/** Vue Router */
const router: Router = createRouter({
  /**
   * History Mode
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html }
   */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  /*
  scrollBehavior: (to, _from, savedPosition) => {
    let scrollTo: number | string = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.top;
    }
    return goTo(scrollTo);
  },
  */
  routes,
});


// Global After Hooks
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks}
router.afterEach(() => {
  const globalStore = useGlobal();
  // Hide Loading
  globalStore.setLoading(false);
});

/*
const scrollBehavior = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  savedPosition: RouteLocation
): Promise<any> => {
  let scrollpos = {};
  if (to.hash) {
    scrollpos = {
      el: to.hash,
      behavior: 'smooth',
    };
  } else if (savedPosition) {
    scrollpos = savedPosition;
  } else {
    scrollpos = { top: 0 };
  }
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(scrollpos);
    }, 600);
  });
};
*/

export default router;
