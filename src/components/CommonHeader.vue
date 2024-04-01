<template>
  <div class="header-container">
    <!-- 左侧区域 -->
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabs"
          :key="item.path"
          :to="{ path: item.path }"
        >
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧区域 -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="profile" src="../assets/user-default.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed: {
    ...mapState({
      tabs: (state) => state.tab.tabList,
    }),
  },
  mounted() {
    // console.log("tabs", this.tabs);
  },
};
</script>

<style lang="less">
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;

  .l-content {
    display: flex;
    align-items: center;
    .text {
      color: #fff;
      font-size: 14px;
      margin-left: 10px;
      font-weight: 400;
    }
    .el-breadcrumb {
      margin-left: 20px;
      .el-breadcrumb__inner.is-link {
        color: #666;
        font-weight: normal;
      }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }

  .r-content {
    display: flex;
    align-items: center;
    .profile {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
}
.el-header {
  padding: 0;
}
</style>
