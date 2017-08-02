<template>
    <div>
         <!--<Header title="统计报表" back="/my" v-if="!_isWeixin()"></Header>-->
        <web class="web wx-web" :src="pageSrc"></web>
    </div>
</template>
<script>
    import config from 'config'
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                pageSrc: ''
            }
        },
        created() {
            storage.getItem('token', m => {
                this.pageSrc = config.reportPage + '?token=' + m.data
            })
        }
    }

</script>
<style scoped>
    .web {
        flex: 1;
        /*margin-top:88px;*/
    }
</style>