import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/modules/auth/routes.js";
import dashboardRoutes from "@/modules/dashboard/routes.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...authRoutes, ...dashboardRoutes]
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) {
    // Check if is first route
    if (routeTo.path === "/") {
      /// TODO If it's authenticated return to desired page otherwise go to login
      /// Example:
      /// store.getters['auth/isAuthenticated'] ? next({path: '/dashboard'}) : next({path: '/login'});
      next({ path: "/login" });
    }
    return next();
  }

  /// TODO Check if user is authenticated
  // If auth is required and the user is logged in...
  // Example
  // if (store.getters["auth/isAuthenticated"]) {
  //   return next();
  // }

  return next(); // Delete this

  /// TODO Uncomment once you've authentication working
  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  //next({ path: "/login" });
});

export default router;
