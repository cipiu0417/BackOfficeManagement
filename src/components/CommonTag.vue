<template>
  <div>
    <div class="tabs">
      <el-tag
        v-for="(item, index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        size="small"
      >
        {{ item.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),

    // 点击tabs实现跳转
    changeMenu(item) {
      //   console.log(item);
      // 通过router名称实现跳转
      this.$router.push({ name: item.name });
    },
    // 点击tabs删除并跳转
    handleClose(item, index) {
      // 当前索引为index
      const length = this.tags.length - 1;
      // 跳转逻辑
      // 删除非激活的tag，则没有关系
      if (item.name !== this.$route.name) {
        // 调用删除store中tag数据的方法
        this.closeTag(item);
        return;
      }
      // 删除激活的tag，且该tag不是最后一个，则跳转到下一个tag
      if (index !== length) {
        this.$router.push({
          name: this.tags[index + 1].name,
        });
        // 调用删除store中tag数据的方法
        this.closeTag(item);
      }
      // 删除激活的tag，且该tag是最后一个，则跳转到前一个tag
      else {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
        // 调用删除store中tag数据的方法
        this.closeTag(item);
      }
    },
  },
};
</script>

<style lang="less">
.tabs {
  padding-left: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
