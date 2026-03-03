// 引入插件
import ChatHome from "@/components/ChatHome.vue";
import UserLogin from "@/pages/UserLogin.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import UserRegister from "@/pages/UserRegister.vue";

// 注册使用插件
Vue.use(VueRouter);

console.log("Login component:", UserLogin);
console.log("Register component:", UserRegister);

// 路由规则
const routes = [
  {
    path: "/",
    component: ChatHome,
  },
  {
    path: "/user",
    // 父路由需要渲染子路由的占位符
    component: {
      render(h) {
        return h("router-view");
      },
    },
    children: [
      {
        name: "login",
        path: "login", // 完整路径：/user/login
        component: UserLogin,
      },
      {
        name: "register",
        path: "register", // 完整路径：/user/register
        component: UserRegister,
      },
      {
        path: "", // 访问 /user 时重定向到 login
        redirect: "login",
      },
    ],
  },
];

// 生成路由器
const router = new VueRouter({
  routes,
  mode: "history",
});

// 导入路由器
export default router;
