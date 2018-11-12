<template>
    <div class="frame">
        <img src="./close.png" class='close' @click='cancle'>
        <img src="./warn.png" class='photo'>
        <span class='title'>{{title}}</span>
        <el-button type='primary' class='confirm' @click='check'>确认</el-button>
        <el-button class='cancle' @click='cancle'>取消</el-button>
    </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods:{
      check(){
          this.$emit('check')
      },
      cancle(){
          this.$emit('cancle')
      }
  }
};
</script>

<style scoped>
.frame {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  margin-left: -205px;
  margin-top: -120px;
  width: 410px;
  height: 240px;
  text-align: center;
  background: #fff;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.photo {
  position: absolute;
  left: 180px;
  top: 40px;
  width: 50px;
  height: 50px;
}
.title {
  position: relative;
  top: 120px;
}
.confirm {
  position: absolute;
  top: 170px;
  left: 85px;
}
.cancle {
  position: absolute;
  top: 170px;
  left: 225px;
}
</style>
