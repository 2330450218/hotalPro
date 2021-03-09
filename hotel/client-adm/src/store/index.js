import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import enhance from './modules/enhance'
import getters from './getters'

Vue.use(Vuex)

/**
 *  vuex store 是响应式的，当vue组件从store中读取状态（state）时，若store中的状态发生更新时，会及时的响应给其他的组件。
    store 中的四个核心选项:     state mutation  getters  actions
    1）state是用来存放组件之间共享的数据，一般会在组件的计算属性中获取state的数据。
    使用：this.$store.state.  ...
    2)  在 Vuex store 中，实际改变 状态(state) 的唯一方式是通过提交(commit) 一个 mutation。
    在组件里提交： this.$store.commit('change', payload)
    mutations下的函数接收state作为参数，接收一个叫做payload（载荷）的东西作为第二个参数，这个东东是用来记录开发者使用该函数的一些信息，比如说提交了什么，提交的东西是用来干什么的，包含多个字段，所以载荷一般是对象
    还有一点需要注意：mutations方法必须是同步方法！
    3）getters
　　getters可以看成是store的计算属性。
　　getters下的函数接收state作为第一个参数。getters可以过滤组件中的数据，过滤的数据会存放到$store.getters对象中。
    4）actions
    actions：类似于mutation ，但是mutations只能处理同步函数，而actions则是可以处理任何的异步操作 
    actions和mutations的区别：
    　1.Actions 提交的是 mutations，而不是直接变更状态。也就是说，actions会通过mutations，让mutations帮他提交数据的变更。
    　2.Action 可以包含任意异步操作。
    this.$store.dispatch('add', 5);
    执行时会触发actions里面的方法，和commit的用法相同。
 */
export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    enhance
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
