<template>
  <div>
    <div class="toggleButton" @click='change' :class='{gBlue:toggle}'>
      <div class="circle" :class='{toggle:toggle}'></div>
    </div>
  </div>
</template>

<script>
import { login, render } from "@/api/test";
import c from "@/utils";
export default {
  data() {
    return {
      toggle: false
    };
  },
  methods: {
    change() {
      this.toggle = !this.toggle;
    }
  }
};
</script>

<style scoped>
.toggleButton {
  position: relative;
  left: 300px;
  top: 300px;
  width: 40px;
  height: 20px;
  padding: 1px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  background: #dcdfe6;
  cursor: pointer;
}
.gBlue {
  background: #409eff;
}
.circle {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: #fff;
  transition: all 0.4s;
}
.toggle {
  transform: translateX(18px);
}
</style>
