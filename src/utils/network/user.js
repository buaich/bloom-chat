import axios from "axios";

// 创建AxiosInstance实例
const userHttp = axios.create({
  baseURL: "http://localhost:8081/",
  timeout: 3 * 1000,
});

// 请求拦截器：非认证请求通通需要携带token
userHttp.interceptors.request.use(function (config) {
  // 如果不是进行认证的请求
  const url = config.url;
  if (!["/user/login", "/user/register"].some((white) => white === url)) {
    console.log("<utils/network/user.js>:interceptors.request");
    config.headers["long-token"] = localStorage.getItem("long-token");
    config.headers["short-token"] = localStorage.getItem("short-token");
  }
  return config;
});

// 响应拦截器：存储双token
userHttp.interceptors.response.use(
  (response) => {
    const url = response.config.url;
    console.log(url);
    if (["/user/login", "/user/register"].some((white) => url === white)) {
      //   console.log(
      //     "<utils/network/user.js>:interceptors.response",
      //     response.headers["long-token"],
      //   );
      localStorage.setItem("long-token", response.headers["long-token"]);
      localStorage.setItem("short-token", response.headers["short-token"]);
    }
    return response.data;
  },
  (error) => {
    console.log(error);
  },
);

export default userHttp;
