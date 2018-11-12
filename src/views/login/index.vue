<template>
  <div class="login">
    <img src="./img/school.png" class='school'>
    <div class="main">
      <div class="form">
        <span class="title">欢迎登录</span>
        <div class='info'>
          <el-input placeholder="请输入用户名" class='el-input' v-model='username' @change='checkUser'></el-input>
          <span class='danger'>{{userErr}}</span>
        </div>
        <div class='info'>
          <el-input placeholder="请输入密码" class='el-input' v-model='password' type='password' @change='checkPw'></el-input>
          <span class='danger'>{{pwErr}}</span>
        </div>
        <el-button class="login-button" type='primary' @click="loginMain" @keyup.enter="loginMain">登录</el-button>
      </div>
    </div>
    <self-input class='test'></self-input>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { mapMutations } from "vuex";
import  selfInput  from "@/components/input";
export default {
  components:{
    selfInput
  },
  data() {
    return {
      username: "",
      password: "",
      userErr: "",
      pwErr: ""
    };
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      setToken: "setToken",
      setMoney: "setMoney"
    }),
    checkUser() {
      if (this.username.length < 6 || this.username.length > 12)
        this.userErr = "用户名必须大于6位小于12位！";
      else this.userErr = "";
    },
    checkPw() {
      if (this.password.length < 8 || this.password.length > 16)
        this.pwErr = "密码必须大于8位小于12位！";
      else this.pwErr = "";
    },
    loginMain() {
      if (this.username == "") this.userErr = "用户名不能为空！";
      if (this.password == "") this.pwErr = "密码不能为空！";
      if (this.userErr != "" || this.pwErr != "") return;
      login({
        username: this.username,
        password: this.password
      })
        .then(res => {
          // console.log(res.data);
          if (res.data == "wrong") {
            alert("用户名或密码错误! 请阅读readme文件！");
            return;
          } else {
            this.setUser(res.data);
            // console.log(this.$store.state.user.user)
            this.$router.push("/");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.test{
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075), 0 0 0 0.2em rgba(3,102,214,0.3)
}
.school {
  display: block;
  margin: 30px 0 30px 100px;
}
.main {
  height: 540px;
  background: url("./img/bg.jpg") no-repeat;
  background-size: 100% 540px;
}
.form {
  position: relative;
  left: 70%;
  top: calc(15vh);
  width: 360px;
  height: 290px;
  background: #fff;
}
.title {
  display: inline-block;
  width: 96px;
  height: 31px;
  margin-top: 30px;
  margin-left: 132px;
  margin-bottom: 17px;
  font-size: 24px;
  color: rgba(74, 144, 226, 1);
  line-height: 31px;
}
.icon {
  position: absolute;
  top: 16px;
  left: 7px;
}
.danger {
  color: #f00;
}
.info {
  position: relative;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 20px;
}
.login-button {
  display: inline-block;
  width: 80%;
  margin-left: 10%;
}
</style>
