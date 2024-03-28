<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
      <!-- 没有子菜单 -->
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 有子菜单 -->
      <el-submenu
        v-for="item in haveChildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="child in item.children" :key="child.path">
          <el-menu-item @click="clickMenu(child)" :index="child.path">
            {{ child.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { router } from "@/router";

export default {
  name: "CommonAside",
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "首页1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "首页2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    haveChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  methods: {
    clickMenu(item) {
      console.log(item);
      this.$router.push(item.path, () => {});
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-menu {
  height: 100%;
  border-right: 0;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
