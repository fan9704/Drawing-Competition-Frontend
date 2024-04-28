import { useGlobal } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';

import { useCurrentUser } from 'vuefire';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: async () => await import('@/views/IndexView.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/part',
    name: 'Part',
    component: async () => await import('@/views/PartView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/part/:id',
    name: 'PartEditView',
    component: async () => await import('@/views/PartEditView.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/part/management',
    name: 'PartManagement',
    component: async () => await import('@/views/PartManagementView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: async () => await import('@/views/OrderView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order/:id',
    name: 'OrderEdit',
    component: async () => await import('@/views/OrderEditView.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order/create',
    name: 'OrderCreateView',
    component: async () => await import('@/views/OrderCreateView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/order/schedule',
    name: 'OrderSchedule',
    component: async () => await import('@/views/ScheduleView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/account',
    name: 'Account',
    component: async () => await import('@/views/AccountView.vue'),
    meta: {
      requiresAuth: false,
    },
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

// Global before guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards}
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const globalStore = useGlobal();
    const user = useCurrentUser();

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user.value) {
        next({ name: 'Account' });
      } else {
        next();
      }
    } else {
      next();
    }
  }
);

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
