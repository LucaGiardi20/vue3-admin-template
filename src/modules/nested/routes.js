export default [
  {
    path: "/nested",
    component: () => import("@/layouts/master"),
    redirect: "/nested",
    meta: {
      authRequired: true,
      title: "Nested routes"
    },
    children: [
      {
        path: "",
        component: () => import("@/modules/nested/pages/nested"),
        name: "nested",
        meta: {
          authRequired: true
        }
      },
      {
        path: "level-1",
        component: () => import("@/modules/nested/pages/level1"),
        name: "level-1",
        meta: {
          authRequired: true,
          title: "Level 1"
        }
      },
      {
        path: ":id",
        component: () => import("@/modules/nested/pages/level1id"),
        name: "level-1-id",
        meta: {
          authRequired: true,
          title: "Level 1 Edit"
        }
      }
    ]
  }
];
