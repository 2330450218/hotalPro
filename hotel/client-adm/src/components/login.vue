<template>
  <div class="wrap" id="wrap">
    <div class="logGet">
      <!-- 头部提示信息 -->
      <div class="logD logDtip">
        <p class="p1">登录</p>
      </div>
      <!-- 输入框 -->
      <div class="lgD">
        <input type="text" placeholder="输入用户名" v-model="phone" />
        <span style="color: red;">{{ptext}}</span>
      </div>
      <div class="lgD">
        <input type="text" placeholder="输入用户密码" v-model="password" />
        <span style="color: red;">{{pwtext}}</span>
      </div>
      <div class="logC">
        <a>
          <button @click="loginin">登 录</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      phone: "",
      password: "",
      ptext: "请输入正确的手机号",
      pwtext: "请输入6-8位的密码",
    };
  },
  watch: {
    phone() {
      let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (reg.test(this.phone)) {
        this.ptext = "";
      }
    },
    password: function () {
      let reg = /^[a-zA-Z0-9]{6,8}$/;
      if (reg.test(this.password)) {
        this.pwtext = "";
      }
    },
  },
  methods: {
    loginin() {
      console.log(this.phone, this.password);
      this.$http
        .post("/login", {
          phone: this.phone,
          pwd: this.password,
          isroot: 1,
        })
        .then((r) => {
          console.log(r.data);
          if (r.data.length === 0) {
            alert("账号或者密码错误");
          } else if (r.data.length === 1) {
            this.nologin = false;
            sessionStorage.setItem("nologin", 1);
            alert("登录成功")
            this.$router.push("/");
            this.$router.go(0)
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // 假设登陆成功，则跳转到 index 组件
      // this.$router.replace('/usersCont');
    },
  },
};
</script>

<style>
body {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: bisque;
}

* {
  margin: 0;
  padding: 0;
}

#wrap {
  height: 600px;
  width: 100%;
  background-position: center center;
  position: relative;
}

#head {
  height: 120px;
  width: 100;
  background-color: #66cccc;
  text-align: center;
  position: relative;
}

#wrap .logGet {
  height: 408px;
  width: 368px;
  position: absolute;
  background-color: #ffffff;
  top: 100px;
  right: 15%;
}

.logC a button {
  width: 100%;
  height: 45px;
  background-color: #ee7700;
  border: none;
  color: white;
  font-size: 18px;
}

.logGet .logD.logDtip .p1 {
  display: inline-block;
  font-size: 28px;
  margin-top: 30px;
  width: 86%;
}

#wrap .logGet .logD.logDtip {
  width: 86%;
  border-bottom: 1px solid #ee7700;
  margin-bottom: 60px;
  margin-top: 0px;
  margin-right: auto;
  margin-left: auto;
}

.logGet .lgD img {
  position: absolute;
  top: 12px;
  left: 8px;
}

.logGet .lgD input {
  width: 100%;
  height: 42px;
  text-indent: 2.5rem;
}

#wrap .logGet .lgD {
  width: 86%;
  position: relative;
  margin-bottom: 30px;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
}

#wrap .logGet .logC {
  width: 86%;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}

.title {
  font-family: "宋体";
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 使用css3的transform来实现 */
  font-size: 36px;
  height: 40px;
  width: 30%;
}

.copyright {
  font-family: "宋体";
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 使用css3的transform来实现 */
  height: 60px;
  width: 40%;
  text-align: center;
}
</style>