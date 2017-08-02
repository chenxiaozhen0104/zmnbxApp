<template>
    <div>
        <AppHeader :title="headerTitle" :canBack="0" v-if="!_isWeixin()"></AppHeader>
        <div class="my-repair">
            <image class="my-repair-img" src="http://img.zmnbx.com//dist/Images/photo.png"></image>
            <div class="my-Name">
                <text class="my-Name-userName">{{name}}</text>
                <text class="my-Name-ServiceCompanyName">{{useCompany}}</text>
            </div>
        </div>
        <div class="my-form">
            <!--<div class="my-basicInformation after" @click="pageTo('/basicInformation')">-->
            <div class="my-basicInformation after" @click="jump('/my/basicInformation','基本信息')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/information.png"></image>
                    <text class="clickAfter">基本信息</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <!--<div class="my-basicInformation after" @click="pageTo('/companyPerMag')" v-if="isShow">-->
            <div class="my-basicInformation after" @click="jump('/my/companyPerMag','用户区域管理')" v-if="isShow">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/arearControl1.png"></image>
                    <text class="clickAfter">用户区域管理</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <!--<div class="my-connect  after" @click="pageTo('/connect')">-->
            <div class="my-connect  after" @click="jump('/my/connect','联系我们')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/connect.png"></image>
                    <text class="clickAfter">联系我们</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <!--<div class="my-changePwd  after" @click="pageTo('/changePwd')">-->
            <div class="my-changePwd  after" @click="jump('/my/changePwd','修改密码')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/changePwd.png"></image>
                    <text class="clickAfter">修改密码</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <!--<div class="my-changePwd  after" @click="pageTo('/report')">-->
            <div class="my-changePwd  after" @click="jump('/my/report','统计报表')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/statistical.png"></image>
                    <text class="clickAfter">统计报表</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-quit  after" @click="quit">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/quit.png"></image>
                    <text class="clickAfter">退出登录</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>

        </div>
        <!--插件-->
        <Footer :active="3"></Footer>
        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
    </div>

</template>

<style>
    .clickAfter:active {
        background-color: #f5f5f5;
    }
    
    .my-header {
        width: 750px;
        height: 88px;
        justify-content: center;
        align-items: center;
        background-color: #0092FC;
    }
    .content-msg,.btn-ok,.btn-cancel{
        font-size:30px;
    }
    .my-header-text {
        font-size: 40px;
        color: white;
    }
    .my-repair {
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        height: 215px;
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
        /*margin-top:88px;*/
    }
    
    .my-repair-img {
        width: 100px;
        height: 100px;
        margin-left: 33px;
        margin-right:13px;
    }
    .my-Name{
        align-items: flex-start;
        justify-content: center;
    }
    .my-Name-userName,{
        margin-bottom:10px;
    }
    .my-Name-userName,
    .my-Name-ServiceCompanyName {
        font-size: 30px;
        color: #333;
    }
    
    
    .my-form {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:750px;
    }
    
    .my-img {
        width: 40px;
        height: 40px;
        margin-left: 33px;
        margin-right: 15px;
    }
    
    .clickAfter {
        font-size: 30px;
        color: #333;
    }
    
    .my-form-left {
        flex-direction: row;
    }
    
    .my-img-go {
        width: 40px;
        height: 40px;
        margin-right: 61px;
    }
    
    .my-basicInformation,
    .my-orderForm,
    .my-connect,
    .my-changePwd,
    .my-quit {
        flex-direction: row;
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
        height: 90px;
        width: 750px;
        align-items: center;
        justify-content: space-between;
    }
    
    .after:active {
        background-color: #f5f5f5;
    }
</style>
<script>
    import constants from "../store/constants"
    import detail from "../components/detail.vue"
    var modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    export default {
        components: {
            'app-detail': detail
        },
        data(){
            return{
                detail: {
                    path: '',
                    title: ''
                },
                isShow:false,
                headerTitle:'我的',
                name:'',
                useCompany:''
            }
        },
        methods: {
            jump(path, title) {
                this.detail.path = path
                this.detail.title = title
                console.log(this.detailPath)
            },
            closeDetail() {
                this.detail.path = ''
            },
            // 退出程序
            quit() {
                modal.confirm({
                    message: '确定退出？',
                    duration: 0.3,
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, (value) => {
                     if (value == "确认") {
                        //  清除存储数据
                        storage.getAllKeys(event => {
                            // modal.toast({ message: event.result })
                            if (event.result === 'success') {
                                event.data.forEach(m => storage.removeItem(m), () => { })
                            }
                        })
                        this.pageTo('/login')
                    }
                })
            }
        },
        created() {
            //判断用户类型
            //  storage.getItem('userType', event => {
            //         this.isShow = false;
            //         if(event.data==8){
            //             this.isShow = true;
            //         }
            //   })
            // //获取存储的名字
            // storage.getItem('name', event => {
            //     this.name = event.data
            storage.getItem('userType', event => {
                this.isShow = false;
                if (event.data & 8) {
                    this.isShow = true;
                }
            })
            storage.getItem('name', event => {
                this.name = event.data;
            })
            storage.getItem('useCompany', event => {
                this.useCompany = event.data;
            })
        }
    }

</script>