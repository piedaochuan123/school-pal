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
import { addInner, addOuter } from "@/api/person";
import { add } from "@/api/test";
export default {
  data() {
    return {
      name: "",
      tel: "",
      number: "",
      sex: "男",
      state: "",
      errName: "",
      errTel: "",
      errNumber: "",
      errState: ""
    };
  },
  /**
   * @param {这个页面和编辑页面非常相似，所以只要看编辑页面的注释就好。用param是用于强调，颜色能突出，本身是描述参数}
   */
  methods: {
    submit() {
      if(this.name == ''){
          this.errName ='用户名不能为空！'
      }
      else if(this.tel ==''){
          this.errTel ='手机号不能为空！'
      }
      else if(this.number == ''){
          this.errNumber = '编号不能为空！'
      }
      else if(this.state == ''){
          this.errState = '状态不能为空！'
      }
      if(this.errName !='' || this.errTel !='' || this.errNumber !='' || this.errState !='') return
      let newEmployee;
      if (this.$store.state.employeeButton === 0) {
        // newEmployee = addInner;
        newEmployee=add;
      } else {
        newEmployee = addOuter;
      }
      newEmployee({
        name: this.name,
        tel: this.tel,
        deparment: this.number,
        sex: this.sex,
        state: this.state
      })
        .then(res => {
          //   c(res.data)
          alert(res.data);
          this.$router.push("/");
        })
        .catch(err => {
          c(err);
        });
    },
    checkName() {
      if (this.name.length < 6 || this.name.length > 12)
        this.errName = "用户名长度必须在6-12位！";
      else this.errName = "";
    },
    checkTel() {
      if (Object.is(+this.tel, NaN)) this.errTel = "手机号必须全为数字";
      else if (this.tel.length != 11) this.errTel = "手机号必须为11位！";
      else this.errTel = "";
    },
    checkNumber() {
      if (Object.is(+this.number, NaN)) this.errNumber = "编号必须全为数字";
      else if (this.number.length != 6) this.errNumber = "编号必须为6位";
      else this.errNumber = "";
    },
    checkState(){
        if(this.state != ''){
            this.errState =''
        }
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
