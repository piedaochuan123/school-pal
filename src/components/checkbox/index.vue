<template>
    <span class="checkboxButton" @click='changeStyle' :class='{style}'></span>
</template>

<script>
export default {
  data () {
    return {
      style: true
    }
  },
  methods:{
    changeStyle(){
      this.style=!this.style
    }
  }
};
</script>

<style scoped lang='scss'>
.checkboxButton {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid rgb(155, 155, 155);
  background: rgba(74, 144, 226, 1);
  background-image: url("./check.png");
  background-repeat: no-repeat;
  background-position: 1.5px 3px;
  cursor: pointer;
}
.style{
  background: #fff;
}
</style>
