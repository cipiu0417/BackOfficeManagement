// 模拟后端提供的数据接口
import Mock from "mockjs";
import homeApi from "./mockServerData/home"
import userApi from "./mockServerData/user"

// 定义mock请求拦截
Mock.mock("/api/home/getData", "get", homeApi.getStatisticalData);

// 用户列表数据
Mock.mock("/api/user/add", "post", userApi.createUser);
Mock.mock("/api/user/edit", "post", userApi.updateUser);
Mock.mock("/api/user/delete", "post", userApi.deleteUser);
Mock.mock(/\/api\/user\/getUser/, "get", userApi.getUserList);

