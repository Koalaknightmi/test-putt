const routes = [
  { file: "/Home", route: "/", enabled: true, permissions: null,accessible:true },
  { file: "/Login", route: "/Login", enabled: false, permissions: null,accessible:true },
  { file: "/Register", route: "/Register", enabled: false, permissions: null,accessible:true },
  { file: "/Logging", route: "/Logging", enabled: true, permissions: {loggedin:true,admin:false},accessible:true },
  { file: "/Log", route: "/Log", enabled: false, permissions: {loggedin:true,admin:false},accessible:false },
  {
    file: "/Leaderboard",
    route: "/Leaderboard",
    enabled: false,
    permissions: {loggedin:true,admin:false} ,accessible:false
  }
];
export default routes