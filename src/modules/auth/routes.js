export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/modules/auth/pages/login"),
    meta: {
      authRequired: false,
      title: "Login"
    }
  }
];
