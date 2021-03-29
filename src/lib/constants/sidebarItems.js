export default [
  {
    label: "Dashboard",
    icon: "el-icon-menu",
    route: "/dashboard"
  },
  {
    label: "Nested",
    icon: "el-icon-user",
    route: "/nested",
    children: [
      {
        label: "Level 1",
        icon: "el-icon-menu",
        route: "/nested/level-1"
      },
      {
        label: "Level 2",
        icon: "el-icon-menu",
        route: "/nested/level-2"
      }
    ]
  }
];
