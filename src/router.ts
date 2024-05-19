import { useGlobal } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';
import Challenge from "@/views/challenge/IndexView.vue";
import ChallengePage from "@/views/challenge/ChallengeView.vue";
import TeamAuth from '@/views/team/AuthView.vue'

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component:  async () => await import('@/views/index/IndexView.vue')
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: Challenge,
  },
  {
    path: '/challenge/:id',
    name: 'Challenge-Page',
    component: ChallengePage,
    props: true,
  },
  {
    path: "/team/login",
    name: 'TeamAuth',
    component: TeamAuth
  },
  // Statistic
  {
    path: "/statistic",
    name: 'Statistic',
    component: import('@/views/statistic/IndexView.vue')
  },
  {
    path: "/realtime/statistic",
    name: 'Realtime-Statistic',
    component: async () => await import('@/views/realtime_statistic/IndexView.vue')
  },
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
