import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 定义用户名
    username:''
}
const mutations = {
    // 定义设置用户名传入的方法
    setUsername:(state,username) => {
        state.username = username;
        localStorage.setItem('username',username);
    }
}
const actions = {}
const getters = {
    username:(state) => localStorage.getItem('username')
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})