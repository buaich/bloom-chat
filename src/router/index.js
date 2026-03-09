// 引入插件
import ChatHome from "@/components/ChatHome.vue";
import UserLogin from "@/pages/UserLogin.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import UserRegister from "@/pages/UserRegister.vue";
import rootStore from "@/store/index.js";
import UserChat from "@/pages/UserChat.vue";

// 注册使用插件
Vue.use(VueRouter);

// 路由规则
const routes = [
  {
    path: "/",
    component: ChatHome,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/user",
    meta: {
      requiresAuth: false,
    },
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
        path: "", // 访问 /user 时重定向到 /user/login
        redirect: "login",
      },
    ],
  },

  {
    path: "/chat",
    component: UserChat,
    meta: {
      requiresAuth: true,
    },
  },
];

// 生成路由器
const router = new VueRouter({
  routes,
  mode: "history",
});

//
router.beforeEach((from, to, next) => {
  // 是否已经认证-标识
  const isAuthenticated = rootStore.state.userStore.code === 200;

  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  if (isAuthenticated) {
    next();
    return;
  }

  next({
    name: "login",
  });
});

// 导入路由器
export default router;
