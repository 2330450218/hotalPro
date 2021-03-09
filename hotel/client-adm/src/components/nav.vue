<template>
  <!-- 头部导航栏全局组件 -->
  <div id="app">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1890ff"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item @click="toIndex" style="font-size:24px;font-weight:700;">麦田斋后台管理系统</el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">工作台</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "0",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    togoodsShop() {
      this.$router.push("/goodsShop");
    },
    toIndex() {
      this.$router.push("/");
    },
  },

  created() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1890ff;
}
</style>
