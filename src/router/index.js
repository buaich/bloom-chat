import ChatHome from "@/components/ChatHome.vue";
import UserLogin from "@/pages/UserLogin.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import UserRegister from "@/pages/UserRegister.vue";
import rootStore from "@/store/index.js";
import UserChat from "@/pages/UserChat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: ChatHome,
    meta: { needAuth: false, needPrepaid: false },
  },
  {
    path: "/user",
    meta: { needAuth: false, needPrepaid: false },
    component: {
      render(h) {
        return h("router-view");
      },
    },
    children: [
      { name: "login", path: "login", component: UserLogin },
      { name: "register", path: "register", component: UserRegister },
      { path: "", redirect: "login" },
    ],
  },
  {
    path: "/chat",
    component: UserChat,
    meta: {
      needAuth: true,
      needPrepaid: true,
      vuex: {
        actionsInfo: [
          {
            namespacedPrefix: "relationStore",
            actionType: "getAllRelations",
            rawPayload: () => ({
              userName: rootStore.state.userStore.data?.userName,
            }),
          },
        ],
      },
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(async (to, from, next) => {
  // 获取业务状态码
  const code = rootStore.state.userStore.code;

  // 是否认证过-标识
  const isAuthenticated = code === 200;

  // 不需要认证的，直接放行
  if (!to.meta.needAuth) {
    next();
    return;
  }

  // 未认证，跳转登录
  if (
    !isAuthenticated ||
    !localStorage.getItem("long-token") ||
    !localStorage.getItem("short-token")
  ) {
    next({ name: "login" });
    return;
  }

  // 已登录，但不需要预操作，直接放行
  if (!to.meta.needPrepaid) {
    next();
    return;
  }
  // 根据元数据预获取数据
  const actionsInfo = to.meta.vuex?.actionsInfo || [];
  if (actionsInfo.length > 0) {
    try {
      for (const actionInfo of actionsInfo) {
        // 获取元数据：命名空间前缀、action类型、原始负载
        const { namespacedPrefix, actionType, rawPayload } = actionInfo;

        // 处理负载
        const payload =
          typeof rawPayload === "function" ? rawPayload() : rawPayload;

        // 派发action
        await rootStore.dispatch(`${namespacedPrefix}/${actionType}`, payload);
      }
    } catch (error) {
      console.error("prepaid data failure:", error);
    }
  }

  next();
});

export default router;
