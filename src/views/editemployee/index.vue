<template>
    <div class='newPage'>
        <router-link to='/'>
            <el-button>返回</el-button>
        </router-link>
        <div class="grid-box">
            <div class='name'>姓名</div>
            <div>
                <el-input v-model='name' @change='checkName'></el-input>
            </div>
            <div class='err'>{{errName}}</div>

            <div class='name'>手机号</div>
            <div>
                <el-input v-model='tel' @change='checkTel'></el-input>
            </div>
            <div class='err'>{{errTel}}</div>

            <div class='name'>id编号</div>
            <div>
                <el-input v-model='number' @change='checkNumber'></el-input>
            </div>
            <div class='err'>{{errNumber}}</div>

            <div class='name'>性别</div>
            <div>
                <el-radio v-model="sex" label="男" checked>男</el-radio>
                <el-radio v-model="sex" label="女">女</el-radio>
            </div>
            <div class='err'></div>

            <div class='name'>在职状态</div>
            <div>
                <el-select v-model="state" placeholder="请选择" @change='checkState'>
                    <el-option label="在职" value="在职"></el-option>
                    <el-option label="离职" value="离职"></el-option>
                </el-select>
            </div>
            <div class='err'>{{errState}}</div>
        </div>
        <el-button type='primary' class='submit' @click='submit'>提交</el-button>

    </div>
</template>

<script>
import c from "@/utils";
import { editInner, editOuter } from "@/api/person";
import { edit } from "@/api/test";
export default {
  data() {
    return {
      name: this.$store.state.name, //将vuex内部的数据取出来，用于编辑。
      tel: this.$store.state.tel,
      number: this.$store.state.number,
      sex: this.$store.state.sex,
      state: this.$store.state.state,
      errName: "", //err用于判断输入框格式是否正确。
      errTel: "",
      errNumber: "",
      errState: ""
    };
  },
  methods: {
    submit() {
      if (this.name == "") {
        this.errName = "用户名不能为空！";
      } else if (this.tel == "") {
        this.errTel = "手机号不能为空！";
      } else if (this.number == "") {
        this.errNumber = "编号不能为空！";
      } else if (this.state == "") {
        this.errState = "状态不能为空！";
      }
      if (
        this.errName != "" ||
        this.errTel != "" ||
        this.errNumber != "" ||
        this.errState != ""
      )
        return;
      let editEmployee;
      if (this.$store.state.employeeButton === 0) {
        //确认内部，外部接口，同listPage和newPage。
        // editEmployee = editInner;
        editEmployee = edit;
      } else {
        editEmployee = editOuter;
      }
      editEmployee({
        name: this.name, //后面是this.name，不是name，不能用简写。
        tel: this.tel,
        deparment: this.number,
        sex: this.sex,
        state: this.state
      })
        .then(res => {
          alert(res.data); //输出操作成功。
          const store = this.$store.state;
          store.name = ""; //将vuex内部的编辑数据清空。
          store.tel = "";
          store.sex = "";
          store.state = "";
          store.number = "";
          this.$router.push("/");
        })
        .catch(err => {
          c(err);
        });
    },
    checkName() {
      //所有check方法都是判断输入框格式。
      if (this.name.length < 6 || this.name.length > 12)
        this.errName = "用户名长度必须在6-12位！";
      else this.errName = "";
    },
    checkTel() {
      if (Object.is(+this.tel, NaN)) this.errTel = "手机号必须全为数字";
      //+符号将数字转化字符串，Object.is
      //可以用于判断两个NaN相等。
      else if (this.tel.length != 11) this.errTel = "手机号必须为11位！";
      else this.errTel = "";
    },
    checkNumber() {
      if (Object.is(+this.number, NaN)) this.errNumber = "编号必须全为数字";
      else if (this.number.length != 3) this.errNumber = "部门必须为3位";
      else this.errNumber = "";
    },
    checkState() {
      if (this.state != "") {
        this.errState = "";
      }
    }
  },
  created() {
    if (this.name == "") {
      //当vuex的数据为空的时候，跳转到主页面。里面的5个数据要么同时有，要么同时没有，所以
      //只要判断其中一个就可以了。
      alert("请通过编辑按钮进入");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.newPage {
  margin: 200px;
}
.grid-box {
  display: grid;
  grid-template-columns: 100px 400px 300px;
  grid-template-rows: repeat(5, 50px);
  width: 80%;
  margin: 50px;
}
.name {
  margin-right: 30px;
  line-height: 35px;
  text-align: right;
}
.err {
  position: relative;
  left: 20px;
  top: 10px;
  color: #f00;
}
</style>
