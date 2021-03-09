<template>
  <div>
    <div v-if="nologin">
      <login></login>
    </div>
    <div v-else>
      <div class="all">
        <div>
          <topnav></topnav>
        </div>
        <div class="center">
          <div class="leftnav">
            <leftnav></leftnav>
          </div>
          <div class="rightcont">
            <!-- <welcome></welcome> -->
            <!-- <router-view></router-view> -->
            <center-right></center-right>
          </div>
          <!-- <div class="clear"></div> -->
        </div>

        <!-- <div class="fixbottom">
          <fixbottom></fixbottom>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import login from "./components/login.vue";
export default {
  data: function () {
    return {
      nologin: sessionStorage.getItem("nologin") ? false : true,
    };
  },
  components: {
    login,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
.all {
  background-color: #f4f4f4;
  height:100vh;
  width:100vw;
}

.clear {
  clear: both;
}
</style>
<style scoped>
.center{
  display: flex;
}
.leftnav {
width:15%;
}
.rightcont{
  margin-left:20px;
  width:84%;
}
.fixbottom{
  margin-top: 60px;
}
</style>
