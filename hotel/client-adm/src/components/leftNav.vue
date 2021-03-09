<!--  -->
<template>
<!-- 左部导航栏全局组件 -->
  <div style="height:900px;background-color:#fff;overflow:hidden;overflow-y:scroll">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#fff"
      text-color="#333"
      
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">用户信息</span>
        </template>
        <el-menu-item-group>
          <span slot="title" class="title_1">用户</span>
          <el-menu-item index="1-1" @click="tousersCont" class="title_2">用户信息管理</el-menu-item>
          <el-menu-item index="1-2" @click="tousersOrder" class="title_2">用户订单管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <span slot="title" class="title_1">管理员</span>
          <el-menu-item index="1-3" @click="torootCont" class="title_2">管理员信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">楼层管理</span>
        </template>
        <el-menu-item-group  >
          <el-menu-item index="3-1"  @click="togoodsShop" class="title_2">商品信息管理</el-menu-item>
          <el-menu-item index="3-2" @click="tofloor" class="title_2">楼层列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">房型管理</span>
        </template>
        <el-menu-item-group  >
          <el-menu-item index="3-2" @click="toroomtype" class="title_2">房型列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title" >房间管理</span>
        </template>
        <el-menu-item-group  >
          <el-menu-item index="3-2" @click="toroom" class="title_2">房间列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">预定管理</span>
        </template>
        <el-menu-item-group  >          
          <el-menu-item index="3-2" @click="tobookorder" class="title_2">预定列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">入住管理</span>
        </template>
        <el-menu-item-group  >
          <el-menu-item index="3-2" @click="tocheckin" class="title_2">入住列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" class="title">营业统计</span>
        </template>
        <el-menu-item-group  >
          <el-menu-item index="3-2" @click="togoodsLable" class="title_2">统计图表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="3" >
        <i class="el-icon-menu"></i>
        <span slot="title" @click="toSwiper" class="title">轮播图信息</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title" @click="toLable" class="title">专区锚点</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath){console.log(key, keyPath);},
    handleClose(key, keyPath){console.log(key, keyPath);},
    tofloor(){this.$router.push("/floor")},
    togoodsShop(){this.$router.push("/goodsShop")},

    toroomtype(){this.$router.push("/roomtype")},
    toroom(){this.$router.push("/room")},
    tobookorder(){this.$router.push("/bookorder")},
    tocheckin(){this.$router.push("/checkin")},

    tousersOrder(){this.$router.push("/usersOrder")},
    tousersCont(){this.$router.push("/usersCont")},
    torootCont(){this.$router.push("/rootCont")},
    toSwiper(){this.$router.push("/swiper")},
    toLable(){this.$router.push("/lable")},
  },
};
</script>
<style lang='scss' scoped>
::-webkit-scrollbar {
display: none;
}
.title{
  font-size:22px;
  color:#333;
  margin-left:-40px;
}
.title_1{
  font-size:18px;
  margin-left:20px
}
.title_2{
  font-size:16px;
  margin-left:40px
}
</style>