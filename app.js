// import App from './src/App.vue'
// import router from './src/routes.js'
// import mixins from './src/mixins'
// import * as filters from './src/filters'
// import { sync } from 'vuex-router-sync'
//  import store from './src/store'
// import VueEvents from 'vue-events'

import App from './src/App.vue'
import router from './src/routes.js'
import mixins from './src/mixins'
import * as filters from './src/filters'
import store from './src/store'
import VueEvents from 'vue-events'

//const getuiModule = weex.requireModule('GetuiModule')
const storage = weex.requireModule('storage')

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin(mixins)
Vue.use(VueEvents)
// new Vue(Vue.util.extend({ el: '#root', router }, App))
new Vue(Vue.util.extend({ el: '#root', router,store }, App))

storage.getItem('tokenCompany', e => {
  if (e.result == "success") {
    if (e.data.split(',')[1] && e.data.split(',')[0]) {
      router.push('/homePage')
    }
    else if (!e.data.split(',')[1] && e.data.split(',')[0]) {
      router.push('/companyType')
    } else {
      router.push('/login')
    }
  } else {
    router.push('/login')
  }
});








