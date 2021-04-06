export default [
  {
    path: "/dashboard",
    component: () => import("@/layouts/master"),
    redirect: "/dashboard",
    meta: {
      authRequired: true,
      title: "Dashboard"
    },
    children: [
      {
        path: "",
        component: () => import("@/modules/dashboard/pages/dashboard"),
        name: "dashboard",
        meta: {
          authRequired: true
        }
      }
    ]
  }
];
