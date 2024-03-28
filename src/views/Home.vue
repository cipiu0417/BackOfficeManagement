<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8">
        <!-- 用户信息展示 -->
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/user.jpg" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2021-06-16</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <!-- 表格展示 -->
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLable"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16">
        <!-- flex小卡片 -->
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex' }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ backgroundColor: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="discribe">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableLable: {
        date: "日期",
        name: "姓名",
        address: "地址",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
    };
  },
};
</script>

<style lang="less">
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
      font-size: 20px;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      margin-left: 60px;
    }
  }
}

.num {
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .discribe {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
}
</style>
