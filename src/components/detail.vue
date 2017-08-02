<template>
    <div ref="detail" class="detail-panel" :name="path" @click="()=>{}">
        <AppHeader :title="title" canBack="1"></AppHeader>
        <router-view style="flex:1" @close=""></router-view>
    </div>
</template>
<style src="../css/common.css" />
<script>
    import C from '../store/constants'
    var modal = weex.requireModule('modal')
    var animation = weex.requireModule('animation')
    export default {
        name: 'detail',
        props: ['path', 'title'],
        data() {
            return {
                show: false,
                dept: 0,
                closeParam: null
            }
        },
        methods: {
            back() {
                this.$router.back()
                animation.transition(this.$refs.detail, {
                    styles: {
                        transform: 'translate(0px, 0)',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                })
                this.$store.commit(C.store.POP_PAGE)
                this.$emit('close', this.closeParam)

            },
            jump() {
                this.$store.commit(C.store.PUSH_PAGE)
                this.dept = this.$store.state[C.store.PAGE]
                this.$router.push(this.path)
                animation.transition(this.$refs.detail, {
                    styles: {
                        transform: 'translate(-750px, 0)',
                    },
                    duration: 300, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                })
            },
            close() {
                if (this.show && this.$store.state[C.store.PAGE] == this.dept) {
                    this.show = false
                }
            }
        },
        created() {
            var self=this;
             self.$watch('show', (newVal, oldVal) => {
                //   console.log('show:',newVal+":"+oldVal)
                if (newVal) {
                    self.jump()
                } else {
                    self.back()
                }
            })
            
             self.$watch('path', (newVal, oldVal) => {
                console.log('更新PATH值', newVal)
                if (typeof newVal == 'object') {
                    self.show = !!newVal.name
                } else {
                    self.show = !!newVal
                }
            })
           
           
            this.$events.on(C.event.ANDROID_BACK, (param) => {
                this.closeParam = param
                this.close()
            })
            this.$events.on(C.event.DETAIL_BACK, (param) => {
                this.closeParam = param
                this.close()
            })
        }
    }

</script>