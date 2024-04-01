<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8" style="padding-right: 10px">
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
      <el-col :span="16" style="padding-left: 10px">
        <!-- flex小卡片 -->
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
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
        <!-- 折线图 -->
        <el-card style="height: 280px">
          <div ref="zhePics" style="height: 280px"></div>
        </el-card>
        <!-- 柱状图和饼图 -->
        <div class="container">
          <el-card>
            <div ref="zhuPics" style="height: 260px"></div>
          </el-card>
          <el-card>
            <div ref="bingPics" style="height: 220px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      userData: [],
      tableLable: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "昨日支付订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日返还订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日总结订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "昨日省钱订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日偿还订单",
          value: 210,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      // console.log(data.data);
      const { orderData, tableData, userData, videoData } = data.data;
      this.tableData = tableData;
      this.userData = userData;

      // 折线图
      // console.log(orderData);
      // 基于准备好的dom，初始化echarts实例
      var zhePics = echarts.init(this.$refs.zhePics);
      const xAxis = Object.keys(orderData.data[0]);
      // 指定图表的配置项和数据
      var zhePicsOptions = {
        tooltip: {},
        legend: {
          data: xAxis,
        },
        xAxis: {
          data: orderData.date,
        },
        yAxis: {},
        series: [],
      };
      xAxis.forEach((key) => {
        zhePicsOptions.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // 使用刚指定的配置项和数据显示图表。
      zhePics.setOption(zhePicsOptions);

      // 柱状图
      // console.log(userData);
      var zhuPics = echarts.init(this.$refs.zhuPics);
      var zhuPicsOptions = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      zhuPics.setOption(zhuPicsOptions);

      // 饼状图
      // console.log(videoData);
      var bingPics = echarts.init(this.$refs.bingPics);
      var bingPicsOptions = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      bingPics.setOption(bingPicsOptions);
    });
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
    margin-left: 15px;
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
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>
