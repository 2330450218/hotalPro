<template>
<!-- 底部导航栏全局组件 -->
  <div>
    <div class="bottom">
       
      <div class="img">
        <img style="width:160px" src="@/../public/img/image/3.jpg" alt />
      </div>

      <!-- elementui的组件 -->
      <div class="bottom-span">
        <span>联系我们</span>
        <el-divider direction="vertical"></el-divider>
        <span>订购帮助</span>
        <el-divider direction="vertical"></el-divider>
        <span>企业合作</span>
        <el-divider direction="vertical"></el-divider>
        <span>生产经营资质</span>
        <el-divider direction="vertical"></el-divider>
        <span>公告专区</span>
      </div>
      <!-- iconfont，存在assets下的icon里面，在import里面导入的 -->
      <div class="div-icon">
        <div>
          <span class="icon iconfont icon-weibo"></span>
        </div>

        <!-- 两个移动上去的二维码是随便生成的，一样的-->
        <!-- weixin -->
        <div class="div-web">
          <span class="icon iconfont icon-weixin"></span>
          <div class="top">
            <img src="@/../public/img/image/1.png" alt="这是图片" />
          </div>
        </div>

        <!-- weibo -->
        <div class="div-web">
          <span class="icon iconfont icon-APP"></span>
          <div class="top">
            <img src="@/../public/img/image/1.png" alt="这是图片" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.bottom {
  width: 100%;
  height: 272px;
  background-color: #fff;
  color: #333;
  text-align: center;
  display: flex;
  border-top:5px solid #1890ff;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
}
.img,
.bottom-span,
.div-icon{
  margin: 0 auto;
}
.bottom-span{
  margin: 10px;
}
.bottom-span span {
  display: inline-block;
  margin: 0 50px;
  font-size: 12px;
}
.div-icon {
  display: inline-flex;
}
.div-icon > div {
  margin: 25px;
}
.div-icon span {
  display: inline-block;
  width: 50px;
  height: 50px;
  font-size: 50px;
}
.div-web img {
  width: 120px;
  height: 120px;
}

.div-web {
  position: relative;
}

/* 过渡 */
.div-web .top {
  position: absolute;
  bottom: 60px;
  right: -36px;
  height: 0;
  width: 120px;
  overflow: hidden;
  transition: all 0.5s;
}
.div-web:hover .top {
  height: 120px;
}
</style>