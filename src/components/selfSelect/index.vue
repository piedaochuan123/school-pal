<template>
    <div class="select" @mouseover='addShow'>
        <slot name='title'></slot>
        <div class="option" @click='removeShow' v-show='show'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      show:false
    }
  },
  methods:{
    addShow(){
      this.show = true
    },
    removeShow(){
      this.show = false
    }
  }
};
</script>

<style scoped>
.select {
    display: inline-block;
    position: relative;
    width: 360px;
    height: 36px;
    padding-left: 10px;
    padding-top:8px;
    border-radius: 3px;
    border: 1px #979797 solid;
    cursor: pointer;
    background: url('./triangle.png') no-repeat;
    background-position: 338px 13px;
}

.select:hover {
    border-color: #4A90E2
}

.option {
    display: none;
    z-index:1;
    position: absolute;
    top: 36px;
    left: 0;
    width: 360px;
    max-height: 140px;
    overflow-y: auto;
    border: 1px solid #979797;
    border-radius: 3px;
    font-size: 0;
    background: #fff;
}

.option div {
    display: inline-block;
    width: 358px;
    height: 31px;
    padding-top:2px;
    padding-left:7px;
    border: 0;
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap
}

.option div:hover {
    background: rgb(233, 233, 233);
    cursor: pointer;
}
.select:hover .option{
    display: inline-block;
}
</style>
