<template>
  <div class="details">
    <!-- <self-frame title='确认要删除吗?' @cancle='cancle' @check='check' v-show='showFrame'>
    </self-frame> -->
    <!-- 两个操作按钮和搜索框 -->
    <router-link to='/newemployee'>
      <el-button type='primary'>新建员工</el-button>
    </router-link>
    <el-button type='primary' @click='removeSome'>批量删除</el-button>
    <el-button type='primary' @click='addShowClub'>批量修改部门</el-button>
    <div class="club" v-show='showClub'>
      <img src="./close.png" class='club-close' @click='closeClub'>
      <span>请选择部门</span>
      <self-select>
        <span slot='title'>{{club}}</span>
        <div v-for='club in clubs' :key='club' @click='changeClub(club)'>{{club}}</div>
      </self-select>
      <el-button type='primary' class='club-confirm' @click='confirmClub'>确认</el-button>
      <el-button class='club-cancel' @click='closeClub'>取消</el-button>
    </div>
    <el-input placeholder="请输入内容" class='search'>
      <template slot="append">
        <i class="fa fa-search" aria-hidden="true"></i>
      </template>
    </el-input>
    <!-- 分页，样式需要修改，比如点击颜色会发生变化，标签变大。 -->
    <div>
      <span class='inner' @click='setEmployee(0)'>内部员工</span>
      <span class='outer' @click='setEmployee(1)'>外部员工</span>
    </div>
    <div class="center">
      <!-- dataList，内部员工 -->
      <div class="dataList" v-show='this.$store.state.employeeButton === 0' :class='{firstList}'>
        <table class='table'>
          <tr>
            <td>
              <!-- <self-checkbox class='move-checkbox'></self-checkbox> -->
            </td>
            <td>姓名</td>
            <td>手机号</td>
            <td>部门</td>
            <td>性别</td>
            <td>在职状态</td>
            <td>操作</td>
          </tr>
          <!-- 循环输出从后台返回的数据 -->
          <tr v-for='(value,index) in employeeList' :key='value.name' :class='{deepColor:deepColor[index+(page-1)*10]}'>
            <td>
              <!-- .native方法是百度的。知道这个事件修饰符，但是不知道添加在子组件上可以调用click。 -->
              <!-- 但是还不明白自定义事件和原生事件的具体区别 -->
              <self-checkbox class='move-checkbox' @click.native='selectCheckbox(value.name,index)'></self-checkbox>
            </td>
            <td>{{value.name}}</td>
            <td>{{value.tel}}</td>
            <td>{{value.deparment}}</td>
            <td>{{value.sex}}</td>
            <td>{{value.state}}</td>
            <td class='opration'>
              <a href='#' class='edit' @click='editEmployee(value)'>编辑</a>
              <a href='#' class='delete' @click="deleteEmployee(value.name)">删除</a>
            </td>
          </tr>
        </table>
        <!-- 按钮分页 -->
        <page-button :buttonLoop='buttonLoop' class='pageButton' @changePage='changePage' @moveLast='moveLast' @moveNext='moveNext' :loading='loading'></page-button>
      </div>
      <!-- 外部员工 -->
      <div class="dataList" v-show='this.$store.state.employeeButton === 1' :class='{secondList}'>
        <table class='table'>
          <tr>
            <td>
              <self-checkbox class='move-checkbox'></self-checkbox>
            </td>
            <td>姓名</td>
            <td>手机号</td>
            <td>部门</td>
            <td>性别</td>
            <td>在职状态</td>
            <td>操作</td>
          </tr>
          <tr v-for='(value,index) in secondEmployeeList' :key='value.name' :class='{deepColor:secondDeepColor[index+(page-1)*10]}'>
            <td>
              <self-checkbox class='move-checkbox' @click.native='selectCheckbox(value.name,index)'></self-checkbox>
            </td>
            <td>{{value.name}}</td>
            <td>{{value.tel}}</td>
            <td>{{value.number}}</td>
            <td>{{value.sex}}</td>
            <td>{{value.state}}</td>
            <td class='opration'>
              <a href='#' class='edit' @click='editEmployee(value)'>编辑</a>
              <a href='#' class='delete' @click="deleteEmployee(value.name)">删除</a>
            </td>
          </tr>
        </table>
        <page-button :buttonLoop='secondButtonLoop' class='pageButton' @changePage='changePage' @moveLast='moveLast' @moveNext='moveNext' :loading='loading'></page-button>
      </div>
    </div>
  </div>
</template>

<script>
import checkbox from "#/checkbox";
import c from "@/utils";
import { remove, arrToObj } from "@/utils/arr";
import pageButton from "@/components/pageButton";
import selfFrame from "@/components/selfFrame";
import selfSelect from "@/components/selfSelect";
import { render, removeEmployee, removeApi } from "@/api/test";
import {
  newInner,
  newOuter,
  deleteInner,
  deleteOuter,
  deleteInnerSome,
  deleteOuterSome,
  changeNumberInner,
  changeNumberOuter
} from "@/api/person";
export default {
  components: {
    selfCheckbox: checkbox,
    pageButton,
    selfFrame,
    selfSelect
  },
  data() {
    return {
      employeeList: [],
      secondEmployeeList: [],
      firstList: false,
      secondList: false,
      buttonLoop: 0,
      secondButtonLoop: 0,
      page: 1,
      secondPage: 1,
      checkboxGroup: [],
      deepColor: [false],
      secondDeepColor: [false],
      showFrame: false,
      loading: [],
      showClub: false,
      club: "请选择部门",
      clubs: [985, 211, 111, 123]
    };
  },
  methods: {
    addEmployee(page) {
      //接口，如果state里面的employeeButton值是0，调用内部员工，否则调用外部员工。
      let newEmployee;
      if (this.$store.state.employeeButton === 0) {
        newEmployee = newInner;
      } else if (this.$store.state.employeeButton === 1) {
        newEmployee = newOuter;
      }
      newEmployee({
        page
      })
        .then(res => {
          if (this.$store.state.employeeButton === 0) {
            this.buttonLoop = res.data[res.data.length - 1];
            //动态确定deepColor里面的true，false项有几个，用于颜色加深。
            this.deepColor = [];
            this.checkboxGroup = [];
            for (let i = 0; i < this.buttonLoop * 10; i++) {
              this.deepColor.push(false);
            }
            this.employeeList = res.data;
            this.employeeList.pop();
            arrToObj(
              this.employeeList,
              "id",
              "name",
              "tel",
              "number",
              "sex",
              "state"
            );
            if (this.employeeList.length == 0) this.firstList = true; //数据为空，输出背景图。
          }
          if (this.$store.state.employeeButton === 1) {
            this.secondDeepColor = [];
            this.checkboxGroup = [];
            for (let i = 0; i < this.secondButtonLoop * 10; i++) {
              this.secondDeepColor.push(false);
            }
            this.secondButtonLoop = res.data[res.data.length - 1];
            this.secondEmployeeList = res.data;
            this.secondEmployeeList.pop();
            arrToObj(
              this.secondEmployeeList,
              "id",
              "name",
              "tel",
              "number",
              "sex",
              "state"
            );
            if (this.secondEmployeeList.length == 0) this.secondList = true;
          }
          this.$set(this.loading, page, false);
        })
        .catch(err => {
          c(err);
        });
    },
    setEmployee(n) {
      //切换内部外部员工，同时调用相应接口。
      this.$store.state.employeeButton = n;
      this.addEmployee();
    },
    deleteEmployee(name) {
      //删除按钮，name能判断当前项。
      let check = confirm("确认要删除吗");
      if (check == false) return;
      let removeEmployee;
      if (this.$store.state.employeeButton == 0) {
        // removeEmployee = deleteInner;
        removeEmployee = removeApi;
      } else if (this.$store.state.employeeButton == 1) {
        removeEmployee = deleteOuter;
      }
      removeEmployee({
        name
      })
        .then(res => {
          alert(res.data);
        })
        .catch(err => {
          c(err);
        });
      this.addEmployee(this.page - 1);
    },
    editEmployee(value) {
      //编辑按钮，将该数据储存到vuex中。
      this.$store.state.name = value.name;
      this.$store.state.tel = value.tel;
      this.$store.state.number = value.deparment;
      this.$store.state.sex = value.sex;
      this.$store.state.state = value.state;
      this.$router.push("/editemployee"); //跳转到编辑页面。
    },
    changePage(page) {
      //按钮切换页码，修改data数据，同时调用接口。
      this.page = page + 1;
      this.loading[page] = true;
      this.addEmployee(page);
    },
    moveLast() {
      //上一页按钮事件。
      if (this.$store.state.employeeButton == 0)
        this.addEmployee(--this.page - 1);
      if (this.$store.state.employeeButton == 1)
        this.addEmployee(--this.secondPage - 1);
    },
    moveNext() {
      //下一页按钮事件/
      if (this.$store.state.employeeButton == 0) this.addEmployee(this.page++);
      if (this.$store.state.employeeButton == 1)
        this.addEmployee(this.secondPage++);
    },
    selectCheckbox(value, index) {
      remove(this.checkboxGroup, value); //remove方法见utils
      // c(this.checkboxGroup)
      index = index + (this.page - 1) * 10;
      if (this.$store.state.employeeButton == 0)
        this.$set(this.deepColor, index, !this.deepColor[index]);
      //因为deepColor是数组，所以一定要用$set，否则
      //数据变了，但是背景色无法改变。
      else this.$set(this.secondDeepColor, index, !this.secondDeepColor[index]);
      // c(this.checkboxGroup);
    },
    removeSome() {
      if (this.checkboxGroup.length == 0) {
        alert("你还没有选择任何数据！");
        return;
      } else {
        let check = confirm("确认要删除吗？");
        if (!check) return;
        let deleteSome;
        if (this.$store.state.employeeButton === 0) {
          deleteSome = deleteInnerSome;
        } else deleteSome = deleteOuterSome;
        deleteSome({
          checkboxGroup: this.checkboxGroup
        })
          .then(res => {
            alert(res.data);
            location.reload();
          })
          .catch(err => c(err));
      }
    },
    addShowClub() {
      if (this.checkboxGroup.length == 0) {
        alert("你还没有选择任何数据！");
        return;
      }
      this.showClub = true;
    },
    changeClub(value) {
      this.club = value;
    },
    closeClub() {
      this.showClub = false;
      this.club = "请选择部门";
    },
    confirmClub() {
      if (this.club == "请选择部门") {
        alert("你还没有选择部门！");
        return;
      } else {
        let club;
        if (this.$store.state.employeeButton == 0) {
          club = changeNumberInner;
        } else club = changeNumberOuter;
        club({
          club: this.club,
          checkboxGroup: this.checkboxGroup
        })
          .then(res => {
            alert(res.data);
            this.showClub = false;
            location.reload();
          })
          .catch(err => c(err));
      }
    }
  },
  created() {
    this.addEmployee(0); //一进入页面就显示前10条数据，该接口也可以放在mounted里面调用。
  }
};
</script>

<style scoped lang='scss'>
.dataList {
  background: #fff;
  width: 100%;
  height: 580px;
  text-align: center;
}
.firstList,
.secondList {
  background: url("./noData.png") no-repeat;
  background-position: 50%;
}
.club {
  position: absolute;
  left: 30%;
  top: 30%;
  z-index: 2;
  width: 450px;
  height: 240px;
  padding-top: 50px;
  border: 1px solid #909399;
  background: #fff;
}
.club-close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.club-confirm,
.club-cancel {
  position: relative;
  top: 85px;
}
.club-confirm {
  left: 60px;
}
.club-cancel {
  left: 185px;
}
.inner,
.outer {
  position: relative;
  top: 20px;
  left: 20px;
  display: inline-block;
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background: #fff;
  cursor: pointer;
}
.move-checkbox {
  position: relative;
  left: 50px;
}
.search {
  position: relative;
  left: 48%;
  width: 23%;
}
.no-data {
  border: transparent;
  position: absolute;
  left: 47%;
  top: 42%;
}
.no-data td {
  width: 300px;
  height: 300px;
}
.table {
  border: 0;
  width: 100%;
  text-align: left;
}
tr:first-child {
  background: #f2f3f4;
  height: 30px;
}
.opration {
  width: 156px;
}
td {
  height: 30px;
  font-size: 14px;
  padding: 5px;
  min-width: 40px;
  padding-left: 20px;
  max-height: 38px;
}
tr {
  border-bottom: 1px solid #e5e5e5;
  max-height: 38px;
}
tr:hover {
  background: #f4f8ff;
}
tr:first-child:hover {
  background: #f2f3f4;
}
.delete {
  position: relative;
  left: 8px;
  display: none;
}
tr:hover .delete {
  display: inline;
}
.show-text {
  font-size: 12px;
  margin: 5px;
}
.dataList div {
  position: relative;
  top: calc(2vh);
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
.dataList div {
  position: relative;
  top: calc(2vh);
}
/* checkbox */
.deepColor {
  background: #dcdfe6;
}
.pageButton {
  margin-top: 20px;
}
</style>