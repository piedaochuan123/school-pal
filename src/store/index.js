import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)


export default new Vuex.Store({  //vuex 自己写的，也就一个基本的state，模块引入都没写。
      state:{
          employeeButton:0,
          name:'',
          tel:'',
          number:'',
          sex:'',
          state:''
      },
      modules:{
          user
      }
})