// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import C from './constants'
// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const store = new Vuex.Store({
  actions,
  mutations,

  state: {
    [C.store.TOKEN]: null,
    [C.store.USER]: null,
    [C.store.PAGE]: 0
  }
})

export default store