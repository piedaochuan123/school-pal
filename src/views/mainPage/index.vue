<template>
  <div>
    <!-- 导航栏 -->
    <div class='nav'>
      机构管理系统
      <div class='head-portrait'>
        <img src="static/img/smallpig.png">
        <div class='self-info'>
          <img src="static/img/pig.png" class='portrait'>
          <span class='user-title'>{{$store.state.user.user}}<br>
            <span class='breif'>系统管理员</span>
          </span>
          <div class="user-button">
            <el-button size='small'>个人设置</el-button>
            <el-button size='small' class='cancle' @click='loginOut'>注销</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 左菜单 -->
    <div class="left-menu">
      <img src="static/img/school.png" class='school'>
      <ul class='menu'>
        <li v-for='value in menuList' :key='value.name'>
          <img :src="value.src">{{value.name}}
        </li>
      </ul>
    </div>

    <!-- 主内容 -->
    <div class="main">
      <div class="top">当前位置： 员工 > 员工列表</div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import { removeUser } from "@/utils/localStorage";
export default {
  data() {
    return {
      menuList: [
        {
          src: require("./img/home.png"),
          name: "首页"
        },
        {
          src: require("./img/employee.png"),
          name: "员工管理"
        },
        {
          src: require("./img/students.png"),
          name: "学员管理"
        },
        {
          src: require("./img/class.png"),
          name: "班级管理"
        },
        {
          src: require("./img/scores.png"),
          name: "学分管理"
        },
        {
          src: require("./img/bedroom.png"),
          name: "寝室管理"
        }
      ]
    };
  },
  methods: {
    loginOut() {
      let check = confirm(
        "确定要登出吗?"
      );
      if (check == false) return;
      else {
        removeUser();
        location.reload();
      }
    }
  },
  mounted() {
    if (this.$store.state.user.user == null) {
      alert("你还没有登录，请先登录！");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
/* 导航栏 */
.nav {
  z-index: 2;
  width: 100%;
  height: 40px;
  padding: 8px 0 8px 20px;
  position: fixed;
  font-size: 18px;
  background: #000;
  color: #fff;
}
.head-portrait {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  position: relative;
  left: 95%;
  top: -23px;
  background: #fff;
  cursor: pointer;
}
.head-portrait:hover .self-info {
  display: block;
}
.self-info {
  box-sizing: border-box;
  width: 240px;
  height: 140px;
  border: 1px solid #e5e5e5;
  padding: 20px 20px 0 20px;
  position: relative;
  right: 190px;
  top: 2px;
  background: #fff;
  color: #000;
  font-size: 14px;
  display: none;
}
.portrait {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  float: left;
  background: rgb(247, 244, 241);
}
.user-title {
  display: inline-block;
  margin-top: 10px;
  margin-left: 5px;
}
.breif {
  color: #999;
}
.user-button {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 7px 0 7px 20px;
  position: absolute;
  left: 0;
  top: 100px;
  background: #f5f5f5;
}
.new-button {
  width: 76px;
  height: 26px;
  border: 1px solid #ccc;
  line-height: 26px;
  font-size: 12px;
  color: #4a4a4a;
  background: inherit;
}
/* 左菜单 */
.left-menu {
  height: calc(100vh - 40px);
  background: #505cbe;
  min-width: 200px;
  color: #fff;
  padding-top: 30px;
  box-sizing: border-box;
  position: fixed;
  top: 40px;
}
.school {
  position: relative;
  left: 20px;
}
.menu {
  position: relative;
  top: 30px;
}
.menu li {
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding: 14px 0 14px 20px;
  box-sizing: border-box;
  opacity: 0.8;
  cursor: pointer;
  border-left: 2px solid #424eb0;
}
.menu li:hover {
  background: #424eb0;
  opacity: 1;
  border-left: 2px solid #fff;
}
/* 详情页 */

.main {
  float: right;
  width: calc(100% - 200px);
  position: relative;
  top: 40px;
}
.top {
  padding: 12px 0 14px 20px;
}
.details {
  width: 100%;
  height: calc(100vh - 86.8px);
  background: #ebebeb;
  padding-left: 20px;
  padding-top: 20px;
  box-sizing: border-box;
}
.center {
  width: calc(100% - 20px);
  height: 460px;
  background: #fff;
  margin-top: 20px;
}
.cancle {
  position: relative;
  left: 40px;
}
</style>
