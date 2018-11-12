<template>
  <input type="text" class="input" :class='{selected}' @focus='select' @blur='removeSelected'>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: false
    }
  },
  methods: {
    select () {
      this.selected = true
    },
    removeSelected () {
      this.selected = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.input {
  z-index: -1;
  border: 1px solid #979797;
  border-radius: 5px;
  width: 360px;
  height: 28px;
  padding-left: 10px;
  outline: none;
}
.selected {
  border: 1px solid #409eff;
}
</style>
