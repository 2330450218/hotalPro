<template>
   
  <div class="welcome">
    <img src="@/../public/img/image/logo.png" alt="">
    

    
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(30, 30, 30, 0.2);
  top: 0;
  left: 0;
  z-index: 99;
}
.addmodal {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -250px;
  background-color: white;
}
.addform {
  width: 300px;
  margin: 20px auto;
}
.btn {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>

<style scoped>
.welcome>img{
  width: 80%;
  padding: 3% 10%;
}
</style>