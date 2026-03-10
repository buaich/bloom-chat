<template>
  <div class="left" ref="leftPanel">
    <div class="trigger-wrapper">
      <div class="trigger" @click="change('friend')">
        <p class="trigger-word">Friend</p>
        <svg
          t="1773133141559"
          class="trigger-icon"
          :class="{ rotated: friendOpen }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4764"
          width="15"
          height="15"
        >
          <path
            d="M77.01369341 651.62563145L465.92050279 226.34930347a61.20218114 61.20218114 0 0 1 45.97224413-20.80173438A61.20218114 61.20218114 0 0 1 557.86856617 226.34930346L946.773588 651.62563145c18.98558228 20.05275039 24.85232562 49.27921402 15.04045657 75.09324227s-33.49334857 43.83969546-61.01448826 46.29221581l-777.49364709 0c-27.62660522-2.34705484-51.41176271-20.26546899-61.22541931-46.1867503-9.92090966-25.91949376-4.05416635-55.03870431 14.9332035-75.19870778z"
            p-id="4765"
            fill="#2c2c2c"
          ></path>
        </svg>
      </div>

      <!-- 下拉列表容器 -->
      <div
        ref="friendDropdownList"
        class="dropdown"
        :style="{ height: friendHeight + 'px' }"
      >
        <!-- 实际下拉列表 -->
        <ul class="dropdown-list">
          <li
            v-for="(friend, index) in friends"
            :key="index"
            class="dropdown-item"
            @click="communicate(friend)"
          >
            {{ friend }}
          </li>
        </ul>
      </div>
    </div>

    <div class="trigger-wrapper">
      <div class="trigger" @click="change('group')">
        <p class="trigger-word">Groups</p>
        <svg
          t="1773133141559"
          class="trigger-icon"
          :class="{ rotated: groupOpen }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4764"
          width="15"
          height="15"
        >
          <path
            d="M77.01369341 651.62563145L465.92050279 226.34930347a61.20218114 61.20218114 0 0 1 45.97224413-20.80173438A61.20218114 61.20218114 0 0 1 557.86856617 226.34930346L946.773588 651.62563145c18.98558228 20.05275039 24.85232562 49.27921402 15.04045657 75.09324227s-33.49334857 43.83969546-61.01448826 46.29221581l-777.49364709 0c-27.62660522-2.34705484-51.41176271-20.26546899-61.22541931-46.1867503-9.92090966-25.91949376-4.05416635-55.03870431 14.9332035-75.19870778z"
            p-id="4765"
            fill="#2c2c2c"
          ></path>
        </svg>
      </div>
      <div
        ref="groupDropdownList"
        class="dropdown"
        :style="{ height: groupHeight + 'px' }"
      >
        <!-- 实际群聊列表 -->
        <ul class="dropdown-list">
          <li
            v-for="(group, index) in groupList"
            :key="index"
            class="dropdown-item"
          >
            {{ group }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import legman from "@/utils/legman/bus.js";

export default {
  name: "UserChatLeft",
  data() {
    return {
      friendOpen: false, //展开标识
      groupOpen: false,

      friendHeight: 0, //下拉列表高度
      groupHeight: 0,
      groupList: ["Family", "Friends", "Work", "Travel", "Sports", "Music"],
    };
  },

  computed: {
    // 从关系存储库中获取用户列表
    ...mapState("relationStore", {
      friends: (state) => state.data.map((relation) => relation.friendName),
    }),
  },

  methods: {
    /**
     * @description 动态改变面板内容高度
     * @param {string} panelName - 目标面板名称
     * @returns {undefined}
     */
    change(panelName) {
      if (panelName === "friend") {
        // 切换触发器状态
        this.friendOpen = !this.friendOpen;

        if (this.friendOpen) {
          // 将回调函数包装成任务放入微任务队列中
          this.$nextTick(() => {
            const leftHeight = this.$refs.leftPanel.clientHeight; //获取面板固定高度
            const maxHeight = leftHeight / 2;
            const dropdown = this.$refs.friendDropdownList;
            if (dropdown) {
              const scrollHeight = dropdown.scrollHeight;
              this.friendHeight = Math.min(scrollHeight, maxHeight);
            }
          });
        } else {
          // 收起：高度设为0
          this.friendHeight = 0;
        }
      } else if (panelName === "group") {
        // 切换 group 状态
        this.groupOpen = !this.groupOpen;
        if (this.groupOpen) {
          this.$nextTick(() => {
            const leftHeight = this.$refs.leftPanel.clientHeight;
            const maxHeight = leftHeight / 2;
            const dropdown = this.$refs.groupDropdownList;
            if (dropdown) {
              const scrollHeight = dropdown.scrollHeight;
              this.groupHeight = Math.min(scrollHeight, maxHeight);
            }
          });
        } else {
          this.groupHeight = 0;
        }
      }
    },

    /**
     * @description 任意组件间通信-传递聊天对象（对方）信息
     * @param {string} name - 对方的名称
     * @returns {undefined}
     */
    communicate(name) {
      console.log("<pages/chat/UserChatLeft.vue>: communicate execute", name);

      legman.emit("chat", { name });
    },
  },
};
</script>

<style scoped>
/* #region 整体布局样式 */
.left {
  width: 250px;
  height: 100%;
  padding: 5px;
  background: white;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  /* 父元素高度限制时，子元素总高度超过则自动开启滚动条 */
  overflow-y: auto;
}
/* #endregion */

/* #region 触发器相关样式 */
/* 触发器包裹层样式：垂直紧凑摆放触发器 */
.trigger-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

/* 触发器样式 */
.trigger {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 12px 0;
  transition: background-color 0.2s;
}
.trigger:hover {
  background-color: #e7e7e7;
}

/* 触发器名称样式 */
.trigger-word {
  margin-right: 5px;
}

/* 触发器图标样式：面板打开时箭头向上 */
.trigger-icon {
  transition: transform 0.3s ease;
}
.trigger-icon.rotated {
  transform: rotate(180deg);
}
/* #endregion */

/* #region 下拉列表相关样式 */
/* 下拉列表容器样式：高度由动态绑定控制，过渡平滑，超出滚动 */
.dropdown {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fafafa;
  transition: height 0.3s ease;
  box-sizing: border-box;
}

/* 实际下拉列表样式 */
.dropdown-list {
  margin: 0;
  padding: 4px 0;
  list-style: none;
}
.dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #444;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #eee;
}
.dropdown-item:last-child {
  border-bottom: none;
}
/* #endregion */
</style>
