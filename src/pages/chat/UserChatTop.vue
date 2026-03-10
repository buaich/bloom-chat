<template>
  <div class="header">
    <div class="search">
      <label class="search-wrapper">
        <svg
          t="1773131990371"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4774"
          width="25"
          height="25"
        >
          <path
            d="M1014.102323 962.497884l-174.062594-186.110456a470.412692 470.412692 0 0 0 109.284005-302.186315C949.323734 212.765923 736.353031 0 474.576542 0 212.936573 0 0 212.765923 0 474.201113c0 261.40106 212.970703 474.201113 474.576542 474.201113 68.49875 0 134.642536-14.334567 196.451822-42.56001 18.293637-8.225311 26.416558-29.693031 18.191247-47.986668l-0.136519-0.27304a36.314235 36.314235 0 0 0-48.020798-18.157117l-0.27304 0.136519a400.514615 400.514615 0 0 1-166.212712 35.870547c-221.400793 0-401.572643-180.03533-401.572642-401.231344 0-221.230144 180.205979-401.265473 401.572642-401.265473 221.400793 0 401.538513 180.03533 401.538513 401.265473a399.661367 399.661367 0 0 1-111.843749 277.885812 36.519015 36.519015 0 0 0 0.955638 51.570309c1.194547 1.023898 2.559744 1.365197 3.754291 2.354965 0.955638 1.365197 1.569976 3.139953 2.730394 4.505149l188.806719 201.810219c6.894244 7.406193 16.587141 11.604173 26.689598 11.570043 9.044429 0 17.849948-3.344732 24.914842-9.795287a36.348365 36.348365 0 0 0 2.150185-51.39966l-0.17065-0.204779z"
            fill="#e6e6e6"
            p-id="4775"
          ></path>
        </svg>
        <input
          class="search-box"
          type="text"
          placeholder="Ctrl+F"
          ref="searchInput"
        />
      </label>
    </div>
    <div class="user-info">
      <span>Welcome, {{ userInfo.userName }}!</span>
      <button class="btn-logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserChatTop",
  computed: {
    ...mapState("userStore", { userInfo: "data" }),
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgb(27, 28, 28);
  color: white;
  border-radius: 5px;
}

/* #region 主页搜索框样式 */
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-wrapper {
  display: inline-flex; /* 关键 */
  align-items: center; /* 垂直中线对齐 */
  gap: 6px; /* 图标与框间距，随意调 */
}
.search-wrapper > svg {
  transition: all 0.5s ease;
}
.search-wrapper > svg:hover {
  transform: scale(0.7);
}
.search-box {
  border: none;
  outline: none;
  padding: 0.3em 0.6em;
  width: 100px;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.search-box:focus,
.search-box:focus-visible {
  outline: 2px auto rgb(255, 255, 255);
}
/* #endregion */

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.btn-logout {
  padding: 5px 15px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-logout:hover {
  background: #c0392b;
}
</style>
