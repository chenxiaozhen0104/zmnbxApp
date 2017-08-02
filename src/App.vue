<template>
  <div @androidback="back">
    <router-view @onuserload="userload" style="flex:1"></router-view>
  </div>
</template>

<script>
  import config from 'config'
  const animation = weex.requireModule('animation')
  import C from './store/constants'
  var storage = weex.requireModule('storage')
  export default {
    methods: {
      data() {
        return {
          user: null
        }
      },
      back() {
        this.$events.emit(C.event.ANDROID_BACK)
      },
      userload(user) {
        this.user = user
        this.$store.commit(C.store.SET_TOKEN, user.id)
        this.$store.commit(C.store.SET_USER, user)
       
      }
    },
    created() {
      storage.getItem(C.store.USER, e => {
        if (e.result == C.SUCCESS) {
          let user = JSON.parse(e.data)
          this.userload(user)
          if (!user.serviceCompany) {
            this.$router.push('/companyType')
          } else {
            this.$router.push('/')
          }
        } else {
          this.$router.push('/login')
        }
      })
      
      this.$events.on(C.event.ANDROID_BACK, () => {
        if (this.$store.state[C.store.PAGE] == 0) {
          weex.requireModule('AndroidModule').close()
        }
      })
     
    }
  }

</script>