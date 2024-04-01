// 跟系统菜单有关的数据
export default {
  state: {
    isCollapse: false, // 控制菜单的展开还是收起
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ], // 面包屑数据
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 更新面包屑数据
    selectMenu(state, val) {
      // console.log("state", state);
      // console.log("val", val);
      // 添加数据
      // val不是首页且不存在tabList中则添加
      if (val.name != "home") {
        // 不存在则返回-1
        const idx = state.tabList.findIndex((item) => item.name === val.name);
        if (idx === -1) {
          state.tabList.push(val);
        }
      }
    },
    // 删除指定的tag
    closeTag(state, item) {
      // console.log("tag has been closed");
      const index = state.tabList.findIndex((val) => val.name === item.name);
      state.tabList.splice(index, 1);
    },
  },
};
